import {Router} from "express";
import {getShoppingListsController, createShoppingListController, getShoppingListsByIdController,updateShoppingListController, deleteShoppingListController} from "../controllers/shoppingList.controller.js"
import { addShoppingListItemController } from "../controllers/shoppingListItem.controller.js"
import { compareShoppingListController } from "../controllers/comparison.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
const router = Router();

router.use(authenticateToken);

router.get("/",  getShoppingListsController);

router.post("/",createShoppingListController);

router.post("/:id/items", addShoppingListItemController);
router.get("/:id",authenticateToken, getShoppingListsByIdController);

router.patch("/:id", updateShoppingListController);

router.get("/:id/compare", compareShoppingListController);

router.delete("/:id", deleteShoppingListController);

export default router;
