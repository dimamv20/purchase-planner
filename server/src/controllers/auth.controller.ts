import { Request, Response } from "express";
import { loginUser } from "../services/auth.service.js";

export async function loginController(req: Request, res: Response) {
    const result = await loginUser(req.body);

    return res.json(result);
}