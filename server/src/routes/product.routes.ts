import { Router } from "express";
import {
    getProductsController,
    createProductController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
} from "../controllers/product.controller.js";

const router = Router();

router.get("/", getProductsController);

router.post("/", createProductController);

router.get("/:id", getProductByIdController);

router.patch("/:id", updateProductController);

router.delete("/:id", deleteProductController);

export default router;