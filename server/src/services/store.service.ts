import prisma from "../lib/prisma.js";

export async function getStores() {
    const stores = await prisma.store.findMany();
    return stores;
}
type CreateStoreData = {
    name: string;
    address: string;
    city: string;
};

export type UpdateStoreData = {
    name?: string;
    address?: string;
    city?: string;
    isActive?: boolean;
};

export async function createStore(data: CreateStoreData) {
    if (!data.name || !data.name.trim()) {
        throw new Error("Store name is required");
    }

    if (!data.address || !data.address.trim()) {
        throw new Error("Store address is required");
    }

    if (!data.city || !data.city.trim()) {
        throw new Error("Store city is required");
    }
    
    const name = data.name.trim();
    const address = data.address.trim();
    const city = data.city.trim();

    const store = await prisma.store.create({
        data: {
            name,
            address,
            city,
        },
    });
    return store;

}

export async function getStoreById(storeId: string) {
    const store = await prisma.store.findUnique({
        where: {
            id: storeId,
        },
    });
    return store;
}

export async function updateStore(storeId: string, data: UpdateStoreData) {

    const existingStore = await prisma.store.findUnique({
        where: {
            id: storeId,
        },
    });

    if (existingStore === null) {
        throw new Error("Store not found");
    }

    const updatedStore = await prisma.store.update({
        where: {
            id: storeId,
        },
        data: {
            name: data.name ?? existingStore.name,
            address: data.address ?? existingStore.address,
            city: data.city ?? existingStore.city,
            isActive: data.isActive ?? existingStore.isActive,
        },
    });

    return updatedStore;
}

export async function deleteStore(storeId: string) {
    const existingStore = await prisma.store.findUnique({
        where: {
            id: storeId,
        },
    });

    if (existingStore === null) {
        throw new Error("Store not found");
    }

    const deletedStore = await prisma.store.delete({
        where: {
            id: storeId,
        },
    });

    return deletedStore;
}
