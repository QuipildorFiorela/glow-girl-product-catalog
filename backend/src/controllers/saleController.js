import {getSales, create, getSalesWithProducts} from "../services/sale.service.js";
import SaleDetail from "../models/saleDetailModel.js";
import Product from "../models/productModel.js";

// GET simple: Trae solo las ventas
export const getAllSales = async (req, res) => {
    try {
        const sales = await getSales();
        res.status(200).json({ message: "Ventas encontradas", payload: sales
        });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

// GET con productos: Trae ventas y productos asociados
export const getSalesWithProductsController = async (req, res) => {
    try {
        const salesWithProducts = await getSalesWithProducts();
        res.status(200).json({ 
            message: "Ventas con productos encontradas", 
            payload: salesWithProducts 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error interno del servidor", 
            error: error.message 
        });
    }
};

export const createSale = async (req, res) => {
    console.log("Intentando registrar la venta");
    try {
        const {nombreComprador, productos} = req.body;
        
        // Verifico que los productos existan en la base de datos. PRIMERO VALIDAMOS Y DESPUES EJECUTAMOS
        const productIds = productos.map(p => p.productId);
        const productsFound = await Product.findAll({ 
            where: { id: productIds } 
        });

        if (productsFound.length !== productos.length) {
            return res.status(400).json({ 
                message: "Uno o más productos no existen en la base de datos." 
            });
        }
        // Calculo el total de la venta en base al precio de los productos * la cantidad
        const total = productos.reduce((acc, prod) => {
            const productoDB = productsFound.find(p => p.id === prod.productId);
            return acc + (productoDB.precio * prod.cantidad);
        }, 0);

        // Registrola venta en la tabla sales
        const newSale = await create({
            nombre,
            total
        });

        // Registro los detalles de venta en la tabla sale-detail usando bulkCreate para insertar todos los productos de una vez
        const saleDetails = productos.map(prod => ({
            saleId: newSale.id,
            productId: prod.productId,
            cantidad: prod.cantidad
        }));

        await SaleDetail.bulkCreate(saleDetails); //(sequelize method: permite crear multiples registros a la vez, con una sola consulta)

        res.status(201).json({ 
            message: "Venta registrada con éxito", 
            payload: { venta: newSale, detalles: saleDetails } 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error interno del servidor", 
            error: error.message 
        });
    }
};