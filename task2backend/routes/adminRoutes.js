import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";
import { Question } from "../models/question.models.js";
import { User } from "../models/user.models.js";

const router = express.Router();

router.post("/add-question", verifyToken, verifyAdmin, async (req, res) => {
    const quesData = req.body;
    const { question } = quesData;

    if (!question || !quesData.options || !quesData.category || !quesData.difficulty || !quesData.correctAnswer || !quesData.explanation) {
        return res.status(400).json({ message: "All fields required!" });
    }

    const existingQuestion = await Question.findOne({ question });
    if (existingQuestion) {
        return res.status(400).json({ message: "question already exists!" });
    }

    const newQuestion = new Question(quesData);
    await newQuestion.save();

    res.status(200).json({ message: "New question entered!", quesData });
});

router.put("/update-question/:id", verifyToken, verifyAdmin, async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    const { question } = updatedData;

    if (!question || !updatedData.options || !updatedData.category || !updatedData.difficulty || !updatedData.correctAnswer || !updatedData.explanation) {
        return res.status(400).json({ message: "All fields required!" });
    }

    try {
        const updatedQuestion = await Question.findByIdAndUpdate(id, updatedData);
        res.status(200).json({ message: "Question updated successfully!", updatedQuestion });
    } catch (err) {
        console.error("Error updating question:", err);
        res.status(400).json({ message: "Failed to update the question!" });
    }
})

router.delete("/delete-question/:id", verifyToken, verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        await Question.findByIdAndDelete(id);
        res.status(200).json({ message: "Question deleted successfully!" });
    } catch (err) {
        res.status(400).json({ message: "Failed to delete the question!" });
    }
});

router.get("/search-question/:id", verifyToken, verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const question = await Question.findOne({ id });
        res.status(200).json({ message: "Question found!", question });

    } catch (err) {
        res.status(400).json({ message: "Question search faiure" });
    }
})

router.get("/all-questions", verifyToken, verifyAdmin, async (req, res) => {
    const { category, difficulty } = req.query;

    const query = {};
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;

    const questions = await Question.find(query);
    res.status(200).json(questions);
})

router.get("/fetch-users", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).json({ message: "Error fetching users" });
    }
})

router.delete("/delete-user/:id", verifyToken, verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully!" });
    } catch (err) {
        res.status(400).json({ message: "Error banning user!" });
    }
})

export default router;