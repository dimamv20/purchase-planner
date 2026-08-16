import { Request, Response } from "express";
import { getCategories } from "../services/category.service.js";
import { createCategory } from "../services/category.service.js";
import { getCategoryById } from "../services/category.service.js";
import { updateCategory } from "../services/category.service.js";
import { deleteCategory } from "../services/category.service.js";
import {createCategorySchema,updateCategorySchema,} from "../validators/category.validator.js";

export async function getCategoriesController(req: Request, res: Response) {

    const categories = await getCategories();

    return res.json(categories);
}

export async function createCategoryController(req: Request, res: Response) {
    
    const data = createCategorySchema.parse(req.body);

    const category = await createCategory(data);
    
    return res.status(201).json(category);

}

export async function getCategoryByIdController(req: Request<{ id: string }>, res: Response) {

    const categoryId = req.params.id;
    const category = await getCategoryById(categoryId);
    return res.json(category);
}

export async function updateCategoryController(req: Request<{ id: string }>, res: Response) {
    const categoryId = req.params.id;
    const data = updateCategorySchema.parse(req.body);
    const updatedCategory = await updateCategory(categoryId, data);

    return res.json(updatedCategory);

}

export async function deleteCategoryController(req: Request<{ id: string }>, res: Response) {
    const categoryId = req.params.id;
    await deleteCategory(categoryId);
    return res.status(204).send();
}