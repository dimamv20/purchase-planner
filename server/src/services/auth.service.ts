import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export type LoginData = {
    email: string;
    password: string;
};

export async function loginUser(data: LoginData) {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    console.log("user found:", user !== null);
    if (user === null) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
        data.password,
        user.passwordHash
    );
    console.log("password valid:", isPasswordValid);

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d",
        }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    };
}