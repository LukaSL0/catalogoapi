import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthResult {
    authStatus: boolean | string;
    payload?: string | JwtPayload;
}

export const jwtAuth = async ( req: Request, res: Response, next: NextFunction ): Promise<AuthResult> => {
    const token = req.headers["x-access-token"] as string | undefined;

    try {
        if (!token) {
            return { authStatus: false };
        }

        const jwtSecret = process.env.JWT_TOKEN;
        if (!jwtSecret) {
            return { authStatus: false };
        }

        const response = jwt.verify(token, jwtSecret);
        return {
            authStatus: true,
            payload: response
        };
    } catch (err: any) {
        if (err instanceof jwt.TokenExpiredError) {
            return { authStatus: "Token Expired" };
        } else {
            return { authStatus: false };
        }
    }
};