import {getSales, create, getWithDetails, findPk} from "../services/sale.service.js";
import SalesDetail from "../models/salesdetailModel.js";
import Product from "../models/productModel.js";
import { name } from "ejs";


// GET con productos: Trae ventas y productos asociados
export const getSalesWithDetails = async (req, res) => {
    try {
        const salesWDetails = await getWithDetails();
        res.status(200).json({ 
            message: "Ventas con productos encontradas", 
            payload: salesWDetails 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error interno del servidor", 
            error: error.message 
        });
    }
};

export const getSaleById = async (req, res) => {
    try {
        const { id } = req.params;
        const sale = await findPk(id);

        if (!sale) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }

        // Transformar los datos
        const products = sale.Products.map(product => {
            const count = product.SalesDetail.count;
            const name = product.name;
            const subtotal = count * product.price;

            return {
                name,
                count,
                subtotal
            };
        });

        res.status(200).json({
            message: "Venta encontrada con éxito",
            payload: {
                id: sale.id,
                buyerName: sale.buyerName,
                date: sale.date,
                total: sale.total,
                products: products
            }
        });

    } catch (error) {
        console.error("Error al buscar la venta por ID:", error.message);
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};


export const createSale = async (req, res) => {
    try {
        const { buyerName, products } = req.body;
        const date = new Date();
        const total = req.totalCalculated;
        
        const newSale = await create({ buyerName, date, total });

        const salesDetailsColumns = products.map(prod => ({
            saleId: newSale.id,
            productId: prod.productId,
            count: prod.count
        }));

        await SalesDetail.bulkCreate(salesDetailsColumns); //método de sequelize que permite insertar múltiples registros en una tabla de base de datos con una sola llamada

        res.status(201).json({
            message: "Venta registrada con éxito",
            payload: { sale: newSale, details: salesDetailsColumns }
        });

    } catch (error) {
        console.error("Error al registrar la venta:", error.message);
        res.status(500).json({
            message: "Error interno del servidor. Revisá consola para más info.",
            error: error.message
        });
    }
};
