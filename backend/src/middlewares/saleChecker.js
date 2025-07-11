import { Product } from "../models/associations.js";

/**
 * Middleware que valida la venta antes de registrarla:
 * - Verifica campos requeridos
 * - Valida que los productos existan
 * - Calcula el total de la venta y lo guarda en req.totalCalculated
 */

export const saleChecker = async (req, res, next) => {
    try {
        const { buyerName, products } = req.body;

        // Valido nombre del comprador
        if (!buyerName) {
            return res.status(400).json({ message: "El nombre del comprador es obligatorio y debe ser un texto." });
        }

        // Valido lista de productos
        if (!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Debe incluir al menos un producto en la venta." });
        }

        // Valido que todos los productos existan en la BD
        const productIds = products.map(p => p.productId);
        const productsFound = await Product.findAll({ where: { id: productIds } });

        if (productsFound.length !== products.length) {
            return res.status(400).json({ message: "Uno o más productos no existen en la base de datos." });
        }

        // Calcular el total
        let total = 0;
        products.forEach(product => {
            total += (product.price * product.count)
        });
        // Guardo el total y los productos válidos en req para usarlos en el controller
        req.totalCalculated = total;
        req.productsFound = productsFound;

        next();

    } catch (error) {
        console.error("Error en saleChecker:", error.message);
        return res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

export const saleIdChecker = (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "ID inválido" });
    }
    next();
};

