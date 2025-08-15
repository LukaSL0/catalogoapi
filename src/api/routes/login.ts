import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) return res.sendStatus(401);
        if (username !== "TEST" || password !== "TEST") return res.sendStatus(401);

        const jwtSecret = process.env.JWT_TOKEN;
        if (!jwtSecret) {
            return res.status(500).json({ error: "JWT_TOKEN not set in environment." });
        }

        const token = jwt.sign({ username }, jwtSecret, { expiresIn: "7d" });

        return res.status(200).json({
            message: "Logged-in Successfully.",
            token
        });
    } catch (err: any) {
        return res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});

export default router;