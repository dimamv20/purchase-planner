import {Request, Response} from "express";
import {getUsers, createUser, getUserById, updateUser, deleteUser} from "../services/user.service.js";

export async function getUsersController(req: Request, res: Response) {
    const users = await getUsers();
    return res.json(users);
}

export async function createUserController(req: Request, res: Response) {
    const user = await createUser(req.body);
    return res.status(201).json(user);
}

export async function getUserByIdController(req: Request<{ id: string }>, res: Response) {
    const userId = req.params.id;
    const user = await getUserById(userId);
    return res.json(user);
}

export async function updateUserController(req: Request<{ id: string }>, res: Response) {
    const userId = req.params.id;
    const updatedUser = await updateUser(userId, req.body);
    return res.json(updatedUser);
}

export async function deleteUserController(req: Request<{ id: string }>, res: Response) {
    const userId = req.params.id;
    const deletedUser = await deleteUser(userId);
    return res.json(deletedUser);
}