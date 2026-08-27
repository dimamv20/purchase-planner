import prisma from "../lib/prisma.js";

export async function getShoppingLists(userId: string) {
    const shoppingLists = await prisma.shoppingList.findMany({
        where: {
            userId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            },
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    return shoppingLists;
}

export type CreateShoppingListData = {
    name: string;
    budget?: number;
};

export type UpdateShoppingListData = {
    name?: string;
    budget?: number | null;
};

export async function createShoppingList(
    userId: string,
    data: CreateShoppingListData
) {
    if (!data.name || !data.name.trim()) {
        throw new Error("Shopping list name is required");
    }

    const shoppingList = await prisma.shoppingList.create({
        data: {
            name: data.name.trim(),
            budget: data.budget,
            userId,
        },
        include: {
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    return shoppingList;
}

export async function getShoppingListsById(id: string, userId: string) {
    const shoppingList = await prisma.shoppingList.findUnique({
        where: { id,  userId
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            },
            items: {
                include: {
                    product: true,
                },
            },
        },
    });
    return shoppingList;
}

export async function updateShoppingList(shoppingListId: string,userId: string, data: Partial<UpdateShoppingListData>) {
    const existingShoppingList = await prisma.shoppingList.findUnique({
        where: { id: shoppingListId, userId: userId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                },
            },
            items: {
                include: {
                    product: true,
                },
            },
        },
    });
    if (!existingShoppingList) {
        throw new Error("Shopping List not found");
    }

    const updateData: Partial<UpdateShoppingListData> = {};
    if (data.name !== undefined) updateData.name = data.name.trim();
    if (data.budget !== undefined) {updateData.budget = data.budget;}

    const updatedShoppingList = await prisma.shoppingList.update({
        where: { id: shoppingListId },
        data: updateData,
        include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        role: true,
                    },
                },
                items: {
                    include: {
                        product: true,
                    },
                },
            },
    });
    return updatedShoppingList;
}

export async function deleteShoppingList(ShoppingListid: string, userId: string){
    const deletedShoppingList =  await prisma.shoppingList.delete({
        where: {
            id: ShoppingListid,
            userId: userId,
        },
        include:{
           user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    },
                }, 
            items: { include: { product: true } },
        },
    });
    return deletedShoppingList;
}

