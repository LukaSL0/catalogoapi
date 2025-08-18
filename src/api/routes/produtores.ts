import { Router, Request, Response } from "express";
import { Produtor } from "../../db/models/produtorModel.js";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
    try {
        const produtores = await Produtor.find();
        return res.status(200).json(produtores);
    } catch (err: any) {
        console.error("Error fetching produtores:", err);
        return res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});

export default router;