import {Router} from "express";

import {
  updateShoppingListItemController,
  getShoppingListItemByIdController,
  deleteShoppingListItemController
} from "../controllers/shoppingListItem.controller.js";

import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticateToken);

router.patch("/:id", updateShoppingListItemController);

router.get("/:id", getShoppingListItemByIdController);

router.delete("/:id", deleteShoppingListItemController);
export default router;