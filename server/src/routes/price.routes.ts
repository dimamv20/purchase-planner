import { Router } from "express";

import { getPriceController, createPriceController, getPriceByIdController, updatePriceController, deletePriceController} from "../controllers/price.controller.js";

const  router = Router();

router.get("/", getPriceController);

router.post("/", createPriceController);

router.get("/:id", getPriceByIdController);

router.patch("/:id", updatePriceController);

router.delete("/:id", deletePriceController);


export default router;