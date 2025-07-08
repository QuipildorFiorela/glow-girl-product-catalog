import { Router } from "express";
import imageUpload from "../middlewares/uploadImageMiddleware.js";
import { productChecker } from "../middlewares/productChecker.js";
import { getAllProducts, findProductById, createProduct, updateProduct, changeStatus } from "../controllers/productController.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", findProductById);
router.post("/", imageUpload.single("img"), productChecker, createProduct);
router.put("/:id", updateProduct);
router.put("/changeStatus/:id", changeStatus);

export default router;