import {getSales, create, getSalesWithProducts} from "../services/sale.service.js";

export const getAllSales = async (req, res) => {
    try {
        const sales = await getSales();
        res.status(200).json({ message: "Ventas encontradas", payload: sales });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

export const createSale = async (req, res) => {
    console.log("llegamos");
    try {
        const {usuario, productos} = req.body;
        if(!usuario || !productos){
            return res.status(400).json({message: "No se puede registrar la venta porque faltan campos"});
        } else {
            return res.status(200).json({message: "Venta registrada con éxito" })
        }//AREGLAR PORQUIE LA VENTA NNO SE REGISTRA EN LA BD
        const newSale = await create({usuario, productos});
        res.status(201).json({ message: "Venta registrada con éxito", payload: newSale });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export const getSalesWithProductsController = async (req, res) => {
    try {
        const sales = await getSalesWithProducts();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las ventas', error: error.message });
    }
};