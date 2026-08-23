import { Request, Response } from "express";

import {loginUser,registerUser,} from "../services/auth.service.js";

import {registerSchema,loginSchema,} from "../validators/auth.validator.js";

export async function loginController(req: Request, res: Response) {
   try {
        const data = loginSchema.parse(req.body);

        const result = await loginUser(data);

        return res.json(result);
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "Invalid email or password"
        ) {
            return res.status(401).json({
                status: "error",
                message: "Invalid email or password",
            });
        }

        throw error;
    }
}

export async function registerController(
    req: Request,
    res: Response
) {
    const data = registerSchema.parse(req.body);

    const user = await registerUser(data);

    return res.status(201).json(user);
}