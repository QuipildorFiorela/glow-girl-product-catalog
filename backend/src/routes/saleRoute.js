import {Router} from "express";
import {getAllSales, createSale, getSalesWithProductsController} from "../controllers/saleController.js"

const router = Router();

router.get("/", getAllSales);
router.post("/", createSale);
router.get("/", getSalesWithProductsController);

export default router;