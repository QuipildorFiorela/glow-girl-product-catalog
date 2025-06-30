import { Router } from "express";
import { getAllProducts, findProductById, createProduct, updateProduct, changeStatus} from "../controllers/productController.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", findProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.put("/changeStatus/:id", changeStatus);

export default router;