import {getProducts, findPk, create, update, remove} from "../services/product.service.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json({ message: "Productos encontrados", payload: products });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const {nombre, descripcion, precio, img, categoria, activo} = req.body;
        if(!nombre || !descripcion || !precio || !img || !categoria || !activo){
            return res.status(400).json({message: "Completa todos los campos"});
        }
        const newProduct = await create({nombre, descripcion, precio, img, categoria, activo});
        res.status(201).json({ message: "Producto creado con éxito", payload: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export const findProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const productFound = await findPk(id)
        if(!productFound){
            return res.status(404).json({message: "Producto no encontrado"});
        }
        res.status(201).json({ message: "Producto encontrado con éxito", payload: productFound });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productFound = await findPk(id)
        if(!productFound){
            return res.status(404).json({message: "Producto no encontrado"});
        }
        const { nombre, descripcion, precio, img, categoria, activo } = req.body;
        if(!nombre || !descripcion || !precio || !img || !categoria || !activo){
            return res.status(400).json({message: "Completa todos los campos"});
        }
        const updatedProduct = await update(id, { nombre, descripcion, precio, img, categoria, activo });
        res.status(200).json({ message: "Producto actualizado con éxito", payload: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const productFound = await findPk(id)
        if(!productFound){
            return res.status(404).json({message: "Producto no encontrado"});
        }
        await remove(id);
        res.status(200).json({ message: "Producto eliminado con éxito"});
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}

/*import ProductDao from "../services/product.service.js";

const ProductController = {
    async getAll(req, res) {
        try {
            const products = await ProductDao.getAll();
            res.json(products);
        } catch (err) {
            res.status(500).send("Error en la base de datos");
        }
    },

    async getById(req, res) {
        try {
            const id = req.params.id;
            const product = await ProductDao.getById(id);
            if (!product) return res.status(404).send("Producto no encontrado");
            res.json(product);
        } catch (err) {
            res.status(500).send("Error en la base de datos");
        }
    },

    async create(req, res) {
        try {
            const nuevoId = await ProductDao.create(req.body);
            res.status(201).json({ id: nuevoId });
        } catch (err) {
            console.error("Error en create:", err);
            res.status(500).send(err.message);
        }
    },

    async update(req, res) {
        try {
            const id = req.params.id;
            const filas = await ProductDao.update(id, req.body);
            if (filas === 0) return res.status(404).send("Producto no encontrado");
            res.send("Producto actualizado");
        } catch (err) {
            res.status(500).send("Error al actualizar producto");
        }
    },

    async delete(req, res) {
        try {
            const id = req.params.id;
            const filas = await ProductDao.delete(id);
            if (filas === 0) return res.status(404).send("Producto no encontrado");
            res.status(204).send();
        } catch (err) {
            res.status(500).send("Error al eliminar producto");
        }
    }
};

export default ProductController;*/
