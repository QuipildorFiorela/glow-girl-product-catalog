import {getProducts, findPk, create, update} from "../services/product.service.js";

// PARA EL ADMIN
export const getAllProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.render("products", { products }); // ("products.ejs", { lista de productos })
    } catch (error) {
        res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

// PARA EL CATALOGO
export const getAllProductsJSON = async (req, res) => {
    try {
        const products = await getProducts();
        res.status(200).json({ message: "Productos encontrados", payload: products }); // Devuelve solo los datos en formato JSON
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

export const changeStatus = async (req, res) => {
    try {
            const { id } = req.params;
            const productFound = await findPk(id);

            if (!productFound) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }

            const nuevoEstado = !productFound.activo;

            await productFound.update({ activo: nuevoEstado });

            res.status(200).json({
                message: `Producto ${nuevoEstado ? "activado" : "desactivado"} con éxito`,
                payload: productFound
            });
        } catch (error) {
            res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
}