import { Router } from "express";
import adminController from "../controllers/adminController.js";

const router = Router();

router.get("/login", adminController.renderLogin);
router.get("/products", adminController.renderProductList);
router.get("/products/create", adminController.renderCreateProduct);
router.get("/edit/:id", adminController.renderUploadProduct);

export default router;
