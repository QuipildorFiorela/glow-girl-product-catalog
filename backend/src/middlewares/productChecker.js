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

export const productUpdateChecker = async (req, res, next) => {
    try {
        const { name, description, price, category, active } = req.body;
        /*if (!name || !description || !price || !category || !active) {
            return res.status(400).json({ message: "Completa todos los campos" });
        }*/
        if(!name){
            return res.status(400).json({ message: "No hay name" });
        }
        if(!description){
            return res.status(400).json({ message: "No hay description" });
        }
        if(!price){
            return res.status(400).json({ message: "No hay price" });
        }
        if(!category){
            return res.status(400).json({ message: "No hay category" });
        }
        if(!active){
            return res.status(400).json({ message: "No hay active" });
        }
        if (price < 1) {
            return res.status(400).json({ message: "El precio debe ser mayor que 0" });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Error al validar el producto", error: error.message });
    }
};

