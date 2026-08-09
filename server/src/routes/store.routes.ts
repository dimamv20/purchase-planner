import { Router } from "express";
import { getStoresController, createStoreController, getStoreByIdController, updateStoreController, deleteStoreController} from "../controllers/store.controller.js";

const router = Router();

router.get("/", getStoresController);

router.post("/", createStoreController);

router.get("/:id", getStoreByIdController);

router.patch("/:id", updateStoreController);

router.delete("/:id", deleteStoreController);


export default router;