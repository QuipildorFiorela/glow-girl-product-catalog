import { Router } from "express";
import { getAllProducts, getAllProductsJSON, findProductById, createProduct, updateProduct, changeStatus} from "../controllers/productController.js";

const router = Router();

console.log("estoy en productRoute");

router.get("/", getAllProducts);
router.get("/json", getAllProductsJSON);
router.get("/:id", findProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.put("/changeStatus/:id", changeStatus);

export default router;