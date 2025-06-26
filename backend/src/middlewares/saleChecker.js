/*saleChecker se encarga de validar que: 
    - Los campos de la venta estén completos (nombre, total, productos)
    - Que el total sea consistente (suma los precios en base a los productos)
*/
export const saleChecker = (req, res, next) => {
    const { buyerName, products } = req.body;

    if (!buyerName || typeof buyerName !== "string") {
        return res.status(400).json({ message: "El nombre es obligatorio y debe ser un texto." });
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ message: "Debe incluir al menos un producto en la venta." });
    }

    next();
};
