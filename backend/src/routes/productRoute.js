import { Router } from "express";
import imageUpload from "../middlewares/imageMulter.js";
import { productChecker, productUpdateChecker } from "../middlewares/productChecker.js";
import { getAllProducts, findProductById, createProduct, updateProduct, changeStatus, deleteProduct } from "../controllers/productController.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", findProductById);
router.post("/", imageUpload.single("img"), productChecker, createProduct);
router.put("/:id", imageUpload.single("img"), productUpdateChecker, updateProduct);
router.put("/changeStatus/:id", changeStatus);
router.delete("/:id", deleteProduct)

export default router;