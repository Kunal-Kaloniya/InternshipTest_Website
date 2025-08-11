import express from "express";
import { Question } from "../models/question.models.js";
import { verifyToken } from "../middleware/authMiddleware.js"

const router = express.Router();

// Store the category inside the cache for 5 minutes
let categoryCache = {
    data: null,
    lastFetch: 0,
};
const CACHE_DURATION = 1000 * 60 * 5;   // 5 minutes

router.get("/categories", async (req, res) => {
    try {
        // Serve from cache if still valid
        if (categoryCache.data && (Date.now() - categoryCache.lastFetch < CACHE_DURATION)) {
            return res.json({ categories: categoryCache.data });
        }

        // fetch from the DB
        const categories = await Question.distinct("category");

        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }

        categoryCache = {
            data: categories,
            lastFetch: Date.now(),
        }

        res.json({ categories });

    } catch (err) {
        console.error("Error fetching categories: ", err);
        res.status(500).json({ message: "Unable to get the categories." });
    }
});

router.get('/questions', async (req, res) => {
    const { category } = req.query;

    if (!category) return res.status(500).json({ message: "No category!" });

    try {
        const questions = await Question.aggregate([
            { $match: { category } },
            {
                $facet: {
                    sectionA: [
                        { $match: { section: 'A' } },
                        { $sample: { size: 5 } },
                    ],
                    sectionB: [
                        { $match: { section: 'B' } },
                        { $sample: { size: 5 } },
                    ],
                    sectionC: [
                        { $match: { section: 'C' } },
                        { $sample: { size: 5 } },
                    ],
                    sectionD: [
                        { $match: { section: 'D' } },
                        { $sample: { size: 5 } },
                    ],
                }
            }
        ])

        res.json({ ...questions[0] });
    } catch (err) {
        res.status(400).json({ message: "Unable to get the questions!" });
    }
});

export default router;