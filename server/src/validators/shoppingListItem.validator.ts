import { z } from "zod";

export const addShoppingListItemSchema = z.object({
    productId: z.string().uuid(),
    quantity: z.number().int().positive(),
});

export const updateShoppingListItemSchema = z.object({
    quantity: z.number().int().positive().optional(),
});