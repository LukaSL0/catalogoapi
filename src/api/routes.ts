import { Router } from "express";
import authRouter from "./routes/auth.js";
import loginRouter from "./routes/login.js";
import produtoresRouter from "./routes/produtores.js";
import catalogoRouter from "./routes/catalogo.js";
import adminRouter from "./routes/admin.js";

const router = Router();

const routeMap: ReadonlyArray<[path: string, r: ReturnType<typeof Router>]> = [
	["/auth", authRouter],
	["/login", loginRouter],
	["/produtores", produtoresRouter],
	["/catalogo", catalogoRouter],
	["/admin", adminRouter],
];

for (const [path, r] of routeMap) { router.use(path, r); }

export default router;