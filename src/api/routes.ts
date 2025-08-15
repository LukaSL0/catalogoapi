import { Router } from "express";
import auth from "./routes/auth";
import login from "./routes/login";
import produtores from "./routes/produtores";
import catalogo from "./routes/catalogo";
import admin from "./routes/admin";

const router = Router();

router.use("/auth", auth);
router.use("/login", login);
router.use("/produtores", produtores);
router.use("/catalogo", catalogo);
router.use("/admin", admin);

export default router;