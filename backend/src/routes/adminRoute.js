import { Router } from "express";
import { renderLogin, renderProducts, renderCreateProduct, renderUpdateProduct, renderSalesWDetails } from "../controllers/adminController.js";

const router = Router();

router.get("/login", renderLogin);
router.get("/catalog", renderProducts);
router.get("/products/create", renderCreateProduct);
router.get("/products/update/:id", renderUpdateProduct);
router.get("/sales", renderSalesWDetails); //muestro en ;a vista de ventas todas las ventas con sus detalles

export default router;
