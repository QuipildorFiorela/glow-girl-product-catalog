import Product from "../models/productModel.js"
import {Op} from "sequelize"; //permite hacer busquedas con comodines (LIKE) para el filtro por busqueda

export const getProducts = async (page = 1, limit = 8, category = '', search = '') => {
    const offset = (page -1) * limit; //desde donde empezar a mostrar

    const whereClause = { //objeto where dinámico
        active : true //filtra solo los activos
    };

    if (category) {
        whereClause.category = category;
    }

    if (search) {
        whereClause.name = { [Op.like]: `%${search}%`} //las busquedas con like son insensible a mayus/minus, pero si a tildes/acentos
    }

    const {rows, count} = await Product.findAndCountAll({
        where: whereClause,
        limit,
        offset
    });

    return {
        products: rows,
        totalItems: count,
        totalPages: (Math.ceil(count / limit))
    }
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