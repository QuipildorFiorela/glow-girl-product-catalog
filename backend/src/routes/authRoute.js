import {Router} from "express";
import authController from "../controllers/authController";

const router = Rouer();
router.post("/login", authController.login);
//router.post("/logut", authController.logout);

export default router;