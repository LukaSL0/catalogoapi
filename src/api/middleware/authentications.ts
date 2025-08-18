import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const MSG = {
    NOT_LOGGED: "User not logged in.",
    INVALID_TOKEN: "Invalid token.",
    TOKEN_EXPIRED: "Token expired.",
    USER_NOT_FOUND: "User not found.",
    FORBIDDEN: "Not authorized.",
};

export interface AuthPayload extends JwtPayload {
    authStatus: boolean;
    payload?: string | JwtPayload;
}

const getToken = (req: Request) => {
    const raw = req.headers["x-access-token"];
    return typeof raw === "string" ? raw : null;
};

const decodeToken = (token: string): { payload?: AuthPayload; expired?: boolean } => {
    try {
        const payload = jwt.verify(token, process.env.JWT_TOKEN!) as AuthPayload;
        return { payload };
    } catch (err: any) {
        if (err instanceof jwt.TokenExpiredError) return { expired: true };
        return {};
    }
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = getToken(req);
    if (!token) return res.status(401).json({ message: MSG.NOT_LOGGED });
    const { payload, expired } = decodeToken(token);
    if (expired) return res.status(401).json({ message: MSG.TOKEN_EXPIRED });
    if (!payload) return res.status(401).json({ message: MSG.INVALID_TOKEN });
    next();
};

export const getAuthStatus = (req: Request): { status: "ok" | "expired" | "invalid" | "missing"; payload?: AuthPayload } => {
    const token = getToken(req);
    if (!token) return { status: "missing" };
    const { payload, expired } = decodeToken(token);
    if (expired) return { status: "expired" };
    if (!payload) return { status: "invalid" };
    return { status: "ok", payload };
};
