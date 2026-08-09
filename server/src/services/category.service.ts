import prisma from "../lib/prisma.js";

export async function getCategories() {
    const categories = await prisma.category.findMany();
    
    return categories;
}
type CreateCategoryData = {
  name: string;
};

export async function createCategory(data: CreateCategoryData) {
    if (!data.name || !data.name.trim()) {
        throw new Error("Category name is required");
    }

    const name = data.name.trim();

    const slug = name
        .toLowerCase()
        .replace(/\s+/g, "-");

    const category = await prisma.category.create({
        data: {
            name,
            slug,
        },
    });

    return category;
}

export async function getCategoryById(categoryId: string) {
    const category = await prisma.category.findUnique({
        where: {
            id: categoryId,
        },
    });

    if (category === null) {
        throw new Error("Category not found");
    }
    return category;
}

export async function updateCategory(
    categoryId: string,
    data: Partial<CreateCategoryData>
) {
    if (!data.name || !data.name.trim()) {
        throw new Error("Category name is required");
    }

    const existingCategory = await prisma.category.findUnique({
        where: {
            id: categoryId,
        },
    });

    if (existingCategory === null) {
        throw new Error("Category not found");
    }

    const name = data.name.trim();

    const slug = name
        .toLowerCase()
        .replace(/\s+/g, "-");

    const updatedCategory = await prisma.category.update({
        where: {
            id: categoryId,
        },
        data: {
            name,
            slug,
        },
    });

    return updatedCategory;
}

export async function deleteCategory(categoryId: string) {
    const existingCategory = await prisma.category.findUnique({
        where: {
            id: categoryId,
        },
    });

    if (existingCategory === null) {
        throw new Error("Category not found");
    }

    await prisma.category.delete({
        where: {
            id: categoryId,
        },
    });
}