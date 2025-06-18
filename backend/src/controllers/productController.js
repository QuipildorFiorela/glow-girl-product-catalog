import ProductDao from "../dao/productDao.js";

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

export default ProductController;
