import { Request, Response } from "express";
import { getProducts } from "../services/product.service.js";
import { createProduct } from "../services/product.service.js";
import {getProductById} from "../services/product.service.js";
import { updateProduct } from "../services/product.service.js";
import { deleteProduct } from "../services/product.service.js";
import {createProductSchema} from "../validators/product.validator.js";

export async function getProductsController(req: Request, res: Response) {
   
    const search =
        typeof req.query.search === "string"
            ? req.query.search
            : undefined;

    const categoryId =
        typeof req.query.categoryId === "string"
            ? req.query.categoryId
            : undefined;
    const page =
        typeof req.query.page === "string"
            ? Number(req.query.page)
            : 1;

    const limit =
        typeof req.query.limit === "string"
            ? Number(req.query.limit)
            : 10;
            
    const products = await getProducts({search,categoryId,page,limit,});

    return res.json(products);
}


export async function createProductController(req: Request,res: Response) {
    const data = createProductSchema.parse(req.body);

    const product = await createProduct(data);

    return res.status(201).json(product);
}
export async function getProductByIdController(req: Request, res: Response) {
    const productId = req.params.id;

    if (typeof productId !== "string") {
        return res.status(400).json({ message: "Product id is required" });
    }

    const product = await getProductById(productId);
    return res.json(product);
}

export async function updateProductController(req: Request<{ id: string }>,res: Response) {
    const productId = req.params.id;

    const updatedProduct = await updateProduct(productId, req.body);

    return res.json(updatedProduct);
}

export async function deleteProductController(req: Request<{ id: string }>, res: Response) {
    const productId = req.params.id;

    const deletedProduct = await deleteProduct(productId);

    return res.json(deletedProduct);
}
