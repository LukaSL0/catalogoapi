import { Router, Request, Response } from "express";
import { getAuthStatus } from "../middlewares/authentications.js";

const router = Router();

router.get("/", async (req: Request, res: Response): Promise<Response> => {
    try {
        const auth = getAuthStatus(req);
        if (auth.status !== "ok" || !auth.payload) {
            const map: Record<string, number> = { missing: 401, invalid: 401, expired: 401 };
            return res.status(map[auth.status] ?? 401).json({ authStatus: false, reason: auth.status });
        }

        return res.status(200).json({
            authStatus: true,
        });
    } catch (err) {
        return res.status(500).json({ error: "Internal Server Error", details: (err as Error).message });
    }
});

export default router;