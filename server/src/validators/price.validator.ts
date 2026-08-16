import { z } from "zod";

export const createPriceSchema = z.object({
    productId: z.string().uuid(),
    storeId: z.string().uuid(),
    regularPrice: z.number().positive(),

    salePrice: z.number().positive().nullable().optional(),

    saleStartsAt: z.coerce.date().nullable().optional(),
    saleEndsAt: z.coerce.date().nullable().optional(),

    isAvailable: z.boolean().optional(),
});

export const updatePriceSchema = z.object({
    regularPrice: z.number().positive().optional(),

    salePrice: z.number().positive().nullable().optional(),

    saleStartsAt: z.coerce.date().nullable().optional(),
    saleEndsAt: z.coerce.date().nullable().optional(),

    isAvailable: z.boolean().optional(),
});