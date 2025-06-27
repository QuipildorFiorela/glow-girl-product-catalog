import {getSales, create, getSalesWProducts} from "../services/sale.service.js";
import SalesDetail from "../models/salesdetailModel.js";
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
export const getSalesWProductsController = async (req, res) => {
    try {
        const salesWProducts = await getSalesWProducts();
        res.status(200).json({ 
            message: "Ventas con productos encontradas", 
            payload: salesWProducts 
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
        const { buyerName, products } = req.body;

        // Validación de datos de entrada
        if (!buyerName) {
            return res.status(400).json({ message: "El nombre del comprador es obligatorio." });
        }

        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Debe incluir al menos un producto en la venta." });
        }
        console.log("Productos recibidos:", products);

        // Verificar si los productos existen
        const productIds = products.map(p => p.productId);
        const productsFound = await Product.findAll({ 
            where: { id: productIds } 
        });

        if (productsFound.length !== products.length) {
            return res.status(400).json({ 
                message: "Uno o más productos no existen en la base de datos." 
            });
        }
        console.log("Productos encontrados en la BD:", productsFound);
        
        // Calculo el total de la venta en base al precio de los productos * la cantidad
        const total = products.reduce((acc, prod) => {
            const productDB = productsFound.find(p => p.id === prod.productId);

            if (!productDB) {
                console.log(`⚠️ Producto con ID ${prod.productId} no encontrado en la BD`);
                return acc;
            }

            const subtotal = productDB.price * prod.count;
            console.log(`Calculando: ${productDB.price} * ${prod.count} = ${subtotal}`);

            return acc + subtotal;
        }, 0);

        console.log(`Total calculado: ${total}`);

        const date = new Date();

        // Registrar la venta
        const newSale = await create({ buyerName, date, total });

        // // Registro los detalles de venta en la tabla salesdetails usando bulkCreate para insertar todos los productos de una vez
        const salesDetailsColumns = products.map(prod => ({
            saleId: newSale.id,
            productId: prod.productId,
            count: prod.count
        }));

        await SalesDetail.bulkCreate(salesDetailsColumns); //(sequelize method: permite crear multiples registros a la vez, con una sola consulta)

        res.status(201).json({ 
            message: "Venta registrada con éxito", 
            payload: { sale: newSale, details: salesDetailsColumns } 
        });

    } catch (error) {
        console.error("❌ Error al registrar la venta:", error.message);
        res.status(500).json({ 
            message: "Error interno del servidor. Revisá consola para más info.", 
            error: error.message 
        });
    }
};
