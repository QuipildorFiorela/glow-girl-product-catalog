import Product from "../models/productModel.js";

/* productChecker se encarga de validar:
    - Que la lista de productos exista
    - Que cada producto contenga un productId y cantidad
    - Que los productos realmente existan en la base de datos
    - Que las cantidades sean mayores a 0
*/
export const productChecker = async (req, res, next) => {
    const { productos: products } = req.body;

    try {
        for (const item of products) {
            if (!item.productId || !item.cantidad) {
                return res.status(400).json({ message: "Cada producto debe tener productId y cantidad" });
            }

            if (item.cantidad <= 0) {
                return res.status(400).json({ message: "La cantidad debe ser mayor a 0" });
            }

            const productFound = await Product.findByPk(item.productId);

            if (!productFound) {
                return res.status(404).json({ message: `Producto con ID ${item.productId} no existe` });
            }
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Error en la validación de productos", error: error.message });
    }
};
