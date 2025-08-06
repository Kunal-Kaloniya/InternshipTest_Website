import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
import { User } from "../models/user.models.js";

const generateToken = (user) => {
    return jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

router.post("/signup", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(401).json({ message: "All credentials are required!" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Sign up successfull", user });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(401).json({ message: "All credentials are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        res.status(400).json({ message: "Invalid credentials!" });
    }

    const isUser = await bcrypt.compare(password, user.password);
    if (!isUser) {
        res.status(400).json({ message: "Incorrect password!" });
    }

    const token = generateToken(user);

    res.status(201).json({ message: "Logged in successfully", user, token });
});

export default router;