import { Router, Request, Response } from "express";
import { Catalogo } from "../../db/models/catalogoModel.js";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
    try {
        const catalogo = await Catalogo.find();
        return res.status(200).json(catalogo);
    } catch (err: any) {
        console.error("Error fetching catalogo:", err);
        return res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});

export default router;