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
        const productFound = await findPk(id);

        if (!productFound) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        const { nombre, descripcion, precio, img, categoria, activo } = req.body;

        if (!nombre || !descripcion || !precio || !img || !categoria || activo === undefined) {
            return res.status(400).json({ message: "Completa todos los campos" });
        }

        await update(id, { nombre, descripcion, precio, img, categoria, activo }); //un arreglo con el número de filas afectadas
        const updatedProduct = await findPk(id); // Volvemos a buscar el producto actualizado

        res.status(200).json({ message: "Producto actualizado con éxito", payload: updatedProduct }); //

    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

//MODIFICAR PARA QUE EL DELETE SEA DAR DE BAJA UN PRODUCTO
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