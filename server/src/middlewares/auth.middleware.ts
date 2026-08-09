import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
    userId: string;
    role: "USER" | "ADMIN";
};

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization token is required",
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Authorization token is required",
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;

        res.locals.user = decoded;

        next();
    } catch {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}