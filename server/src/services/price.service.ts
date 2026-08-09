import prisma from "../lib/prisma.js";

export async function getPrices() {
    const prices = await prisma.price.findMany({
        include: {
            product: true,
            store: true,
        },
    });

    return prices;
}

export type CreatePriceData = {
    productId: string;
    storeId: string;
    regularPrice: number;
};
export async function createPrice(data: CreatePriceData) {
    const price = await prisma.price.create({
        data: {
            productId: data.productId,
            storeId: data.storeId,
            regularPrice: data.regularPrice,
        },
        include: {
            product: true,
            store: true,
        },
    });
    return price;
}

export async function getPricesById(priceId: string) {
    const price = await prisma.price.findUnique({
        where: {
            id: priceId,
        },
        include: {
            product: true,
            store: true,
        },
    });
    return price;
}

export async function updatePrice(priceId: string, data: Partial<CreatePriceData>) {
    const existingPrice = await prisma.price.findUnique({
        where: {
            id: priceId,
        },
    });
    
    if (existingPrice === null) {
        throw new Error("Price not found");
    }

    const updatedPrice = await prisma.price.update({
        where: {
            id: priceId,
        },
        data: {
            productId: data.productId ?? existingPrice.productId,
            storeId: data.storeId ?? existingPrice.storeId,
            regularPrice: data.regularPrice ?? existingPrice.regularPrice,
        },
        include: {
            product: true,
            store: true,
        },
    });
    return updatedPrice;
}

export async function deletePrice(priceId: string) {
    const deletedPrice = await prisma.price.delete({
        where: {
            id: priceId,
        },
        include: {
            product: true,
            store: true,
        },
    });
    return deletedPrice;
}