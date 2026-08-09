import { Router } from "express";
import { getCategoriesController } from "../controllers/category.controller.js";
import { createCategoryController } from "../controllers/category.controller.js";
import { getCategoryByIdController } from "../controllers/category.controller.js";
import { updateCategoryController } from "../controllers/category.controller.js";
import { deleteCategoryController } from "../controllers/category.controller.js";



const router = Router();

router.get("/",getCategoriesController);
router.get("/:id", getCategoryByIdController);

router.post("/", createCategoryController);

router.patch("/:id", updateCategoryController);

router.delete("/:id", deleteCategoryController);
export default router;