import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { Question } from "../models/question.models.js";
import { Result } from "../models/result.models.js";

const router = express.Router();

router.post("/result", verifyToken, async (req, res) => {
    const { answers, category } = req.body;
    let score = 0;

    if (Object.entries(answers).length === 0) {
        await Result.create({
            userId: req.user.id,
            score,
            questionsAttempted: Object.keys(answers).length,
            quizMeta: {
                category: category,
            },
            createdAt: new Date()
        });
        return res.status(200).json({ message: "Atleast try doing some questions!", score });
    }

    for (let [qId, ans] of Object.entries(answers)) {
        const question = await Question.findOne({ _id: qId });

        if (!question) {
            return res.status(404).json({ message: "No such question found." });
        }

        if (ans === question.correctAnswer) {
            score += 1;
        }
    }

    await Result.create({
        userId: req.user.id,
        score,
        questionsAttempted: Object.keys(answers).length,
        quizMeta: {
            category: category,
        },
        createdAt: new Date()
    });

    res.status(200).json({ message: "all questions checked!", score });
});

router.get("/quiz-history", verifyToken, async (req, res) => {
    const history = await Result.find({ userId: req.user.id })

    res.status(200).json(history);
});

export default router;