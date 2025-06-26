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
        const {buyerName, products} = req.body;
        
        // Verifico que los productos existan en la base de datos. PRIMERO VALIDAMOS Y DESPUES EJECUTAMOS
        const productIds = products.map(p => p.productId);
        const productsFound = await Product.findAll({ 
            where: { id: productIds } 
        });
        console.log(products);
        
        if (productsFound.length !== products.length) {
            return res.status(400).json({ 
                message: "Uno o más productos no existen en la base de datos." 
            });
        }
        // Calculo el total de la venta en base al precio de los productos * la cantidad
        const total = products.reduce((acc, prod) => {
            const productDB = productsFound.find(p => p.id === prod.productId);
            return acc + (productDB.price * prod.count);
        }, 0);

        // Registrola venta en la tabla sales
        const newSale = await create({
            buyerName,
            total
        });

        // Registro los detalles de venta en la tabla sale-detail usando bulkCreate para insertar todos los productos de una vez
        const saleDetails = products.map(prod => ({
            saleId: newSale.id,
            productId: prod.productId,
            count: prod.count
        }));

        await SaleDetail.bulkCreate(saleDetails); //(sequelize method: permite crear multiples registros a la vez, con una sola consulta)

        res.status(201).json({ 
            message: "Venta registrada con éxito", 
            payload: { venta: newSale, details: saleDetails } 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error interno del servidor", 
            error: error.message 
        });
    }
};