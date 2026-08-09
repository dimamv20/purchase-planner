import { Request, Response } from "express";
import { getProducts } from "../services/product.service.js";
import { createProduct } from "../services/product.service.js";
import {getProductById} from "../services/product.service.js";
import { updateProduct } from "../services/product.service.js";
import { deleteProduct } from "../services/product.service.js";

export async function getProductsController(req: Request, res: Response) {
   
    const products = await getProducts();

    return res.json(products);
}


export async function createProductController(req: Request,res: Response) {
    const product = await createProduct(req.body);

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
