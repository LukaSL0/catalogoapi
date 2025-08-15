import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./api/routes.js";
import helmet from "helmet";
import { v4 as uuidv4 } from "uuid";
import { validateRequest } from "./api/middleware/validateRequest";
import * as dotenv from "dotenv";
import { connectDatabase } from "./db/database";

dotenv.config();
connectDatabase();

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    if (validateRequest(req)) {
        next();
    } else {
        res.status(401).json({ error: "Connection denied." });
    }
});

app.use(helmet());

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    name: "_sd",
    secret: process.env.SESSION_SECRET || "default_secret",
    genid: () => uuidv4(),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(routes);

app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ status: "Online" });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}.`);
});
