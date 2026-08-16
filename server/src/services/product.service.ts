import prisma from "../lib/prisma.js";


export type GetProductsFilters = {
    search?: string;
    categoryId?: string;
    page?: number;
    limit?: number;
};

export async function getProducts(filters: GetProductsFilters) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;

    const skip = (page - 1) * limit;

    const where = {
        AND: [
            filters.search
                ? {
                      OR: [
                          {
                              name: {
                                  contains: filters.search,
                                  mode: "insensitive" as const,
                              },
                          },
                          {
                              brand: {
                                  contains: filters.search,
                                  mode: "insensitive" as const,
                              },
                          },
                      ],
                  }
                : {},

            filters.categoryId
                ? {
                      categoryId: filters.categoryId,
                  }
                : {},
        ],
    };

    const products = await prisma.product.findMany({
        where,

        include: {
            category: true,
            prices: {
                include: {
                    store: true,
                },
            },
        },

        orderBy: {
            name: "asc",
        },

        skip,
        take: limit,
    });

    const total = await prisma.product.count({
        where,
    });

    const totalPages = Math.ceil(total / limit);

    return {
        products,
        pagination: {
            page,
            limit,
            total,
            totalPages,
        },
    };
}
export async function getProductById(productId: string) {
    const product = await prisma.product.findUnique({
        where: {
            id: productId,
        },
        include: {
            category: true,
        },
    });
    return product;
}
export type CreateProductData = {
    name: string;
    brand: string;
    packageQuantity: number;
    unit: "GRAM" | "KILOGRAM" | "MILLILITRE" | "LITRE" | "PIECE" | "PACK";
    categoryId: string;
};

export async function createProduct(data: CreateProductData) {
    const product = await prisma.product.create({
        data: {
            name: data.name,
            brand: data.brand,
            packageQuantity: data.packageQuantity,
            unit: data.unit,
            categoryId: data.categoryId,
        },
        include: {
            category: true,
        },
    });

    return product;
}

export async function updateProduct(productId: string, data: Partial<CreateProductData>) {
    const existingProduct = await prisma.product.findUnique({
        where: {
            id: productId,
        },
    });

    if (existingProduct === null) {
        throw new Error("Product not found");
    }

    const updatedProduct = await prisma.product.update({
        where: {
            id: productId,
        },
        data: {
            name: data.name ?? existingProduct.name,
            brand: data.brand ?? existingProduct.brand,
            packageQuantity:
                data.packageQuantity ?? existingProduct.packageQuantity,
            unit: data.unit ?? existingProduct.unit,
            categoryId: data.categoryId ?? existingProduct.categoryId,
        },
        include: {
            category: true,
        },
    });

    return updatedProduct;
}

export async function deleteProduct(productId: string) {
    const deletedProduct = await prisma.product.delete({
        where: {
            id: productId,
        },
        include: {
            category: true,
        },
    });
    return deletedProduct;
} 