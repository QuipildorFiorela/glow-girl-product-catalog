export const productChecker = async (req, res, next) => {try {
        const { name, description, price, category, active } = req.body;
        if (!name || !description || !price || !req.file || !category || active === undefined) {
            return res.status(400).json({ message: "Completa todos los campos" });
        }
        if (price < 1) {
            return res.status(400).json({ message: "El precio debe ser mayor que 0" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Error al validar el producto", error: error.message });
        console.log(error);
        
    }
}
