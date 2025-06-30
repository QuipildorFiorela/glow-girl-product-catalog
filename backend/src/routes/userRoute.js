import { Router } from "express";
import { getAllUsers, createUser, findUserByMail, updateUser, deleteUser} from "../controllers/userController.js";

const router = Router()

/*router.get("/", getAllUsers);*/
router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/:mail", findUserByMail);
router.put("/:mail", updateUser);
router.delete("/:mail", deleteUser);

export default router;
