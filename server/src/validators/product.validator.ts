import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1),
    brand: z.string().min(1),
    packageQuantity: z.number().positive(),
    unit: z.enum([
        "GRAM",
        "KILOGRAM",
        "MILLILITRE",
        "LITRE",
        "PIECE",
        "PACK",
    ]),
    categoryId: z.string().uuid(),
});