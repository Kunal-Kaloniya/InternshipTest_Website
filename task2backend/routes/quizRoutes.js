import express from "express";
import { Question } from "../models/question.models.js";
import { verifyToken } from "../middleware/authMiddleware.js"

const router = express.Router();


router.get("/categories", async (req, res) => {
    const categories = await Question.distinct("category");
    res.json(categories);
});

router.get('/questions', async (req, res) => {
    const { category } = req.query;

    if (!category) return res.status(500).json({ message: "No category!" });

    try {
        const sectionA = await Question.aggregate([
            { $match: { section: 'A', category: category } },
            { $sample: { size: 5 } },
        ]);
        const sectionB = await Question.aggregate([
            { $match: { section: 'B', category: category } },
            { $sample: { size: 5 } },
        ]);
        const sectionC = await Question.aggregate([
            { $match: { section: 'C', category: category } },
            { $sample: { size: 5 } },
        ]);
        const sectionD = await Question.aggregate([
            { $match: { section: 'D', category: category } },
            { $sample: { size: 5 } },
        ]);

        res.json({ sectionA, sectionB, sectionC, sectionD });
    } catch (err) {
        res.status(400).json({ message: "Unable to get the questions!" });
    }
});

export default router;