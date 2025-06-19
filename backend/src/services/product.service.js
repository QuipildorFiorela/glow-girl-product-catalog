import Product from "../models/Product.js"

export const getProducts = async () => {
    return await Product.findAll(); // SELECT * FROM users
};

export const findPk = async (id) => {
    return await Product.findByPk(id);
}

export const create = async (product) => {
    return await Product.create(product);
}

export const update = async (id, product) => {
    return Product.update(product, { where: { id } });
}

export const remove = async (id) => {
    return await Product.destroy({ where: { id } })
}

/*const ProductDao = {
    async getAll() {
        const [rows] = await db.query("SELECT * FROM productos");
        return rows;
    },
    async getById(id) {
        const [rows] = await db.query("SELECT * FROM productos WHERE id = ?", [id]);
        return rows[0];
    },
    async create(producto) {
        const { nombre, descripcion, precio, img, categoria } = producto;
        const [result] = await db.query(
            "INSERT INTO productos (nombre, descripcion, precio, img, categoria) VALUES (?, ?, ?, ?, ?)",
            [nombre, descripcion, precio, img, categoria]
        );
        return result.insertId;
    },
    async update(id, producto) {
        const { nombre, descripcion, precio, img, categoria } = producto;
        const [result] = await db.query(
            "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, img = ?, categoria = ? WHERE id = ?",
            [nombre, descripcion, precio, img, categoria, id]
        );
        return result.affectedRows;
    },
    async delete(id) {
        const [result] = await db.query("DELETE FROM productos WHERE id = ?", [id]);
        return result.affectedRows;
    }
};

export default ProductDao;*/


