import {Router} from "express";
import { saleChecker, saleIdChecker } from "../middlewares/saleChecker.js";
import {getSalesWithDetails, getSaleById, createSale} from "../controllers/saleController.js"

const router = Router();

router.get("/", getSalesWithDetails); // -> Devuelve las ventas con los productos asociados.
router.get("/:id", saleIdChecker, getSaleById); //Para traerme la venta y mostrarla en el ticket.
router.post("/", saleChecker, createSale); //Crea una nueva venta pero con validaciones previas (pasa por los middlewares antes de insertarla en la db)

export default router;