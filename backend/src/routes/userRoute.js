import { Router } from "express";
import { getAllUsers, createUser, findUserById, updateUser, deleteUser} from "../controllers/userController.js";

const router = Router()

/*router.get("/", getAllUsers);*/
router.get("/", getAllUsers);
router.get("/:id", findUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
