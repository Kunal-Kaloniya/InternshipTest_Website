import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Player ")) {
        res.status(401).json({ message: "Access Denied! Token not found." }, authHeader);
    }

    const token = authHeader.split(" ")[1];

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(403).json({ message: "Token expired!" });
    }
}

export const verifyAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        res.status(403).json({ message: "Access Denied! Admins only" });
    }

    next();
}
