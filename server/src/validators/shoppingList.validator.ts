import { z } from "zod";

export const createShoppingListSchema = z.object({
    name: z.string().min(1),
    budget: z.number().positive().optional(),
});

export const updateShoppingListSchema = z.object({
    name: z.string().min(1).optional(),
    budget: z.number().positive().nullable().optional(),
});