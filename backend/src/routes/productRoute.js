import { Router } from "express";
import imageUpload from "../middlewares/imageUploadMiddleware.js";
import { getAllProducts, findProductById, createProduct, updateProduct, changeStatus} from "../controllers/productController.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", findProductById);
router.post("/", imageUpload.single("img"), createProduct);
router.put("/:id", updateProduct);
router.put("/changeStatus/:id", changeStatus);

export default router;