import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import {
    getComparisonResultsController,
    getComparisonResultByIdController,
} from "../controllers/comparison.controller.js";

const router = Router();

router.use(authenticateToken);

router.get("/", getComparisonResultsController);
router.get("/:id", getComparisonResultByIdController);

export default router;