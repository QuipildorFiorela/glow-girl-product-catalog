import {Router} from "express";
import login from "../controllers/authController.js";

const router = Router();
router.post("/login", login);
//router.post("/logut", authController.logout);

export default router;