import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/verify-token", verifyToken, (req, res) => {
    res.status(200).json({
        message: "Token is valid",
        user: req.user,
    })
})

export default router;