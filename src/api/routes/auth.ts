import { Router, Request, Response, NextFunction } from "express";
import { jwtAuth } from "../middleware/authentication";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = await jwtAuth(req, res, next);

        if (auth.authStatus === true) {
            return res.status(200).json({ authStatus: true });
        } else if (auth.authStatus === false) {
            return res.status(401).json({ authStatus: false });
        } else {
            return res.status(403).json({ authStatus: auth.authStatus });
        }
    } catch (err: any) {
        return res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});

export default router;