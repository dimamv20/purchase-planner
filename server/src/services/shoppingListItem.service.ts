import  prisma  from "../lib/prisma.js"

export type AddShoppingListItemData = {
    productId: string;
    quantity: number;
};

export type UpdateShoppingListItemData = {
    quantity?: number;
};
export async function addShoppingListItem(shoppingListId: string,userId: string, data: AddShoppingListItemData) {
    const shoppingList = await prisma.shoppingList.findFirst({
        where: {
            id: shoppingListId,
            userId: userId,

        },
    });

    if (!shoppingList) {
        throw new Error("Shopping list not found");
    }

    const product = await prisma.product.findUnique({
        where: {
            id: data.productId,
        },
    });

    if (!product) {
        throw new Error("Product not found");
    }

    const item = await prisma.shoppingListItem.create({
        data: {
            shoppingListId,
            productId: data.productId,
            quantity: data.quantity,
        },
        include: {
            product: true,
        },
    });

    return item;
}

export async function updateShoppingListItem(
    itemId: string,
    userId: string,
    data: UpdateShoppingListItemData
) {
    const existingItem = await prisma.shoppingListItem.findFirst({
        where: {
            id: itemId,
            shoppingList: {
                userId,
            },
        },
    });

    if (existingItem === null) {
        throw new Error("Item in shopping list not found");
    }

    if (data.quantity !== undefined && data.quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
    }

    const updatedItem = await prisma.shoppingListItem.update({
        where: {
            id: itemId,
        },
        data: {
            quantity: data.quantity ?? existingItem.quantity,
        },
        include: {
            product: true,
        },
    });

    return updatedItem;
}

export async function getShoppingListItemById(
    itemId: string,
    userId: string
) {
    const item = await prisma.shoppingListItem.findFirst({
        where: {
            id: itemId,
            shoppingList: {
                userId: userId,
            },
        },
        include: {
            product: true,
        },
    });

    if (item === null) {
        throw new Error("Shopping list item not found");
    }

    return item;
}

export async function deleteShoppingListItem(
    itemId: string,
    userId: string
) {
    const existingItem = await prisma.shoppingListItem.findFirst({
        where: {
            id: itemId,
            shoppingList: {
                userId,
            },
        },
    });

    if (!existingItem) {
        throw new Error("Shopping list item not found");
    }

    await prisma.shoppingListItem.delete({
        where: {
            id: itemId,
        },
    });
}