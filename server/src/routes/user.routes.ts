import {Router} from "express";
import {getUsersController} from "../controllers/user.controller.js";
import {createUserController, getUserByIdController, updateUserController, deleteUserController} from "../controllers/user.controller.js";


const router = Router();

router.get("/", getUsersController);

router.post("/", createUserController);

router.get("/:id", getUserByIdController);

router.patch("/:id", updateUserController);

router.delete("/:id", deleteUserController);

export default router;