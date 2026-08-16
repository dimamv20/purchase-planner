import { z } from "zod";

export const createShoppingListSchema = z.object({
    name: z.string().min(1),
});

export const updateShoppingListSchema = z.object({
    name: z.string().min(1).optional(),
});