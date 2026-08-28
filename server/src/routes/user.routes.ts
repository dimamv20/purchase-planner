import {Router} from "express";
import {getUsersController, getUserByIdController, updateUserController, deleteUserController} from "../controllers/user.controller.js";

import { authenticateToken } from "../middlewares/auth.middleware.js"

const router = Router();
router.use(authenticateToken);

router.get("/", getUsersController);

router.get("/:id", getUserByIdController);

router.patch("/:id", updateUserController);

router.delete("/:id", deleteUserController);

export default router;