import prisma from "../lib/prisma.js";

function getEffectivePrice(price: {
    regularPrice: unknown;
    salePrice: unknown;
    saleStartsAt: Date | null;
    saleEndsAt: Date | null;
}) {
    const now = new Date();

    const saleIsActive =
        price.salePrice !== null &&
        (!price.saleStartsAt || price.saleStartsAt <= now) &&
        (!price.saleEndsAt || price.saleEndsAt >= now);

    return saleIsActive
        ? Number(price.salePrice)
        : Number(price.regularPrice);
}

export async function compareShoppingList(
    shoppingListId: string,
    userId: string
) {
    const shoppingList = await prisma.shoppingList.findFirst({
        where: {
            id: shoppingListId,
            userId,
        },
        include: {
            items: {
                include: {
                    product: {
                        include: {
                            prices: {
                                where: {
                                    isAvailable: true,
                                },
                                include: {
                                    store: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!shoppingList) {
        throw new Error("Shopping list not found");
    }

    const optimizedItems = shoppingList.items.map((item) => {
        const prices = item.product.prices;

        if (prices.length === 0) {
            return {
                productId: item.product.id,
                productName: item.product.name,
                quantity: item.quantity,
                cheapestStore: null,
                unitPrice: null,
                totalPrice: null,
            };
        }

        const cheapestPrice = prices.reduce((cheapest, current) => {
            return getEffectivePrice(current) < getEffectivePrice(cheapest)
                ? current
                : cheapest;
        });

        const unitPrice = getEffectivePrice(cheapestPrice);

        const totalPrice = unitPrice * item.quantity;

        return {
            productId: item.product.id,
            productName: item.product.name,
            quantity: item.quantity,
            cheapestStore: {
                id: cheapestPrice.store.id,
                name: cheapestPrice.store.name,
            },
            unitPrice,
            totalPrice,
        };
    });

    const optimizedTotal = optimizedItems.reduce((sum, item) => {
        return sum + (item.totalPrice ?? 0);
    }, 0);

    const storeTotalsMap = new Map<
        string,
        {
            storeId: string;
            storeName: string;
            total: number;
            availableItems: number;
        }
    >();

    for (const item of shoppingList.items) {
        for (const price of item.product.prices) {
            const storeId = price.store.id;
            const storeName = price.store.name;

            const unitPrice = getEffectivePrice(price);

            const itemTotal = unitPrice * item.quantity;

            const existingStore = storeTotalsMap.get(storeId);

            if (existingStore) {
                existingStore.total += itemTotal;
                existingStore.availableItems += 1;
            } else {
                storeTotalsMap.set(storeId, {
                    storeId,
                    storeName,
                    total: itemTotal,
                    availableItems: 1,
                });
            }
        }
    }

    const storeTotals = Array.from(storeTotalsMap.values());

    const totalItemsCount = shoppingList.items.length;

    const completeStores = storeTotals.filter(
        (store) => store.availableItems === totalItemsCount
    );

    const cheapestSingleStore =
        completeStores.length > 0
            ? completeStores.reduce((cheapest, current) =>
                  current.total < cheapest.total ? current : cheapest
              )
            : null;

    const cheapestSingleStoreTotal =
        cheapestSingleStore?.total ?? null;

    const savings =
        cheapestSingleStoreTotal !== null
            ? cheapestSingleStoreTotal - optimizedTotal
            : 0;

    const comparisonResult = await prisma.comparisonResult.create({
        data: {
            userId,
            shoppingListId: shoppingList.id,
            shoppingListName: shoppingList.name,

            cheapestStoreId: cheapestSingleStore?.storeId ?? null,

            cheapestSingleStoreTotal:
                cheapestSingleStoreTotal,

            optimizedTotal,

            savings,

            storeTotals,
            optimizedItems,
        },
    });
    return {
        id: comparisonResult.id,
        shoppingListId: comparisonResult.shoppingListId,
        shoppingListName: comparisonResult.shoppingListName,
        optimizedItems,
        optimizedTotal,
        storeTotals,
        cheapestSingleStore,
        cheapestSingleStoreTotal,
        savings,
        createdAt: comparisonResult.createdAt,
    };
}

export async function getComparisonResults(userId: string) {
    const results = await prisma.comparisonResult.findMany({
        where: {
            userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return results;
}

export async function getComparisonResultById(
    comparisonId: string,
    userId: string
) {
    const result = await prisma.comparisonResult.findFirst({
        where: {
            id: comparisonId,
            userId,
        },
    });

    if (!result) {
        throw new Error("Comparison result not found");
    }

    return result;
}