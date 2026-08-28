import {Request, Response} from "express";
import {getUsers, createUser, getUserById, updateUser, deleteUser} from "../services/user.service.js";
import {createUserSchema,updateUserSchema,} from "../validators/user.validator.js";

export async function getUsersController(req: Request,res: Response) {
    const role = res.locals.user.role;

    if (role !== "ADMIN") {
        return res.status(403).json({
            message: "Admin access required",
        });
    }

    const users = await getUsers();

    return res.json(users);
}

export async function getUserByIdController(req: Request<{ id: string }>,res: Response) {
    const requestedUserId = req.params.id;

    const currentUserId = res.locals.user.userId;
    const role = res.locals.user.role;

    if (
        requestedUserId !== currentUserId &&
        role !== "ADMIN"
    ) {
        return res.status(403).json({
            message: "Access denied",
        });
    }

    const user = await getUserById(requestedUserId);

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    return res.json(user);
}

export async function updateUserController(req: Request<{ id: string }>,res: Response) {
    const requestedUserId = req.params.id;

    const currentUserId = res.locals.user.userId;
    const role = res.locals.user.role;

    if (
        requestedUserId !== currentUserId &&
        role !== "ADMIN"
    ) {
        return res.status(403).json({
            message: "Access denied",
        });
    }

    const data = updateUserSchema.parse(req.body);

    const updatedUser = await updateUser(
        requestedUserId,
        data
    );

    return res.json(updatedUser);
}

export async function deleteUserController(req: Request<{ id: string }>,res: Response) {
    const requestedUserId = req.params.id;

    const currentUserId = res.locals.user.userId;
    const role = res.locals.user.role;

    if (
        requestedUserId !== currentUserId &&
        role !== "ADMIN"
    ) {
        return res.status(403).json({
            message: "Access denied",
        });
    }

    const deletedUser = await deleteUser(
        requestedUserId
    );

    return res.json(deletedUser);
}