import { Router, Request, Response } from "express";
import { Produtor } from "../../db/models/produtorModel.js";
import { Catalogo } from "../../db/models/catalogoModel.js";
import { Status } from "../../db/models/statusModel.js";

const router = Router();

router.post("/add-produtor", async (req: Request, res: Response) => {
    const { produtor } = req.body;

    try {
        const newProdutor = new Produtor(produtor);
        await newProdutor.save();
        return res.status(201).json({ message: "Produtor adicionado com sucesso!", produtor: newProdutor });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao adicionar produtor", message: err.message });
    }
});

router.post("/edit-produtor", async (req: Request, res: Response) => {
    const { produtor } = req.body;

    try {
        const updatedProdutor = await Produtor.findOneAndReplace({ ordem: produtor.ordem }, produtor);
        return res.status(200).json({ message: "Produtor atualizado com sucesso!", produtor: updatedProdutor });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao atualizar produtor", message: err.message });
    }
});

router.delete("/delete-produtor/:ordem", async (req: Request, res: Response) => {
    const { ordem } = req.params;

    try {
        await Produtor.findOneAndDelete({ ordem: Number(ordem) });
        return res.status(200).json({ message: "Produtor deletado com sucesso!" });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao deletar produtor", message: err.message });
    }
});

router.post("/add-vinho", async (req: Request, res: Response) => {
    const { vinho } = req.body;

    try {
        const newVinho = new Catalogo(vinho);
        await newVinho.save();
        return res.status(201).json({ message: "Vinho adicionado com sucesso!", vinho: newVinho });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao adicionar vinho", message: err.message });
    }
});

router.post("/edit-vinho", async (req: Request, res: Response) => {
    const { vinho } = req.body;

    try {
        const updatedVinho = await Catalogo.findOneAndReplace({ id: vinho.id }, vinho);
        return res.status(200).json({ message: "Vinho atualizado com sucesso!", vinho: updatedVinho });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao atualizar vinho", message: err.message });
    }
});

router.delete("/delete-vinho/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await Catalogo.findOneAndDelete({ id: Number(id) });
        return res.status(200).json({ message: "Vinho deletado com sucesso!" });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao deletar vinho", message: err.message });
    }
});

router.post("/change-status", async (req: Request, res: Response) => {
    const { online } = req.body;

    try {
        const newStatus = new Status({ online });
        await Status.deleteMany({});
        await newStatus.save();
        return res.status(200).json({ message: "Dados atualizados com sucesso!" });
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});

router.get("/status", async (_req: Request, res: Response) => {
    try {
        const statusFind = await Status.find();
        return res.status(200).json(statusFind[0]?.online ?? false);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});

export default router;