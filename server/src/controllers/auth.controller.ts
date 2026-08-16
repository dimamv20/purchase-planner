import { Request, Response } from "express";
import { loginUser } from "../services/auth.service.js";
import {registerSchema,loginSchema,} from "../validators/auth.validator.js";
export async function loginController(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);

    const result = await loginUser(data);

    return res.json(result);
}