import {getSales, create, getSalesWithProducts} from "../services/sale.service.js";

export const getSales = async (req, res) => {
    try {
        const sales = await getSales();
        res.status(200).json({ message: "Ventas encontradas", payload: sales });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

export const createSale = async (req, res) => {
    try {
        const {id, nombre, fecha, total} = req.body;
        if(!id || !nombre || !fecha || !total){
            return res.status(400).json({message: "No se puede registrar la venta porque faltan campos"});
        }
        const newSale = await create({id, nombre, fecha, total});
        res.status(201).json({ message: "Venta registrada con éxito", payload: newSale });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

import { getSalesWithProducts } from "../services/saleService.js";

export const getSalesWithProductsController = async (req, res) => {
    try {
        const sales = await getSalesWithProducts();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las ventas', error: error.message });
    }
};