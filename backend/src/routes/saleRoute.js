import {Router} from "express";
import {getAllSales, createSale, getSalesWithProductsController} from "../controllers/saleController.js"

const router = Router();

router.get("/", getAllSales); //Devuelve solo las ventas (sin detalles de productos).

router.get("/with-products", getSalesWithProductsController); // -> Devuelve las ventas con los productos asociados.

router.post("/", createSale); //Crea una nueva venta pero con validaciones previas (pasa por los middlewares antes de insertarla en la db)

export default router;