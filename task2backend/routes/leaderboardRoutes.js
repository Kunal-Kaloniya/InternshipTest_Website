import express from "express";
import { Result } from "../models/result.models.js";
import { User } from "../models/user.models.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get('/leaderboard', verifyToken, async (req, res) => {
    try {
        const leaderboard = await Result.aggregate([
            {
                $group: {
                    _id: "$userId",
                    totalScore: { $sum: "$score" },
                    quizzesTaken: { $sum: 1 },
                }
            },
            {
                $sort: {
                    totalScore: -1,
                }
            },
            {
                $limit: 10,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "userInfo",
                }
            },
            {
                $unwind: "$userInfo",
            },
            {
                $project: {
                    username: "$userInfo.username",
                    totalScore: 1,
                    quizzesTaken: 1,
                }
            }
        ])

        res.status(200).json(leaderboard);
    } catch (err) {
        console.error("Error fetching leaderboard:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;