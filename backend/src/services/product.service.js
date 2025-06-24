import Product from "../models/product.model.js"

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