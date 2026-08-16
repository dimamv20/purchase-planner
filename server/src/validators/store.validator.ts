import { z } from "zod";

export const createStoreSchema = z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    city: z.string().min(1),
    isActive: z.boolean().optional(),
});

export const updateStoreSchema = z.object({
    name: z.string().min(1).optional(),
    address: z.string().min(1).optional(),
    city: z.string().min(1).optional(),
    isActive: z.boolean().optional(),
});