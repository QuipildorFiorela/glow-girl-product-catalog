import { Router } from "express";
import { renderUsers, getAllUsersWithQuery,/*getAllUsers,*/ createUser, findUserById, updateUser, deleteUser} from "../controllers/user.controller.js";

const router = Router()

/*router.get("/", getAllUsers);*/
router.get("/", renderUsers);
router.get("/search", getAllUsersWithQuery);
router.post("/", createUser);
router.get("/:id", findUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
