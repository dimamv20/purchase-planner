import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export async function getUsers() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return users;
}   

export async function getUserById(userId: string) {
    if (userId === null || userId.trim() === "") {
        throw new Error("User ID is required");
    }
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    }); 
    return user;
}

export type CreateUserData = {
    name: string;
    email: string;
    password: string;
};


export async function createUser(data: CreateUserData) {
    if (!data.name.trim()) {
        throw new Error("Name is required");
    }

    if (!data.email.trim()) {
        throw new Error("Email is required");
    }

    if (!data.password.trim()) {
        throw new Error("Password is required");
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            passwordHash: passwordHash,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return user;
}

export async function updateUser(userId: string, data: Partial<CreateUserData>) {
    const existingUser = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    }); 
    if (existingUser === null) {
        throw new Error("User not found");
    }
    const updatedUser = await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            name: data.name ?? existingUser.name,
            email: data.email ?? existingUser.email,
            passwordHash: data.password ? await bcrypt.hash(data.password, 10) : existingUser.passwordHash,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    
    return updatedUser;
}

export async function deleteUser(userId: string) {
    const deletedUser = await prisma.user.delete({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return deletedUser;
}
