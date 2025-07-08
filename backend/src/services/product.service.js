import Product from "../models/productModel.js"
import {Op} from "sequelize"; //permite hacer busquedas con comodines (LIKE) para el filtro por busqueda

export const getProducts = async (page = 1, limit = 8, category = '', search = '', showOnlyActive = false) => {
    const offset = (page -1) * limit; //desde donde empezar a mostrar
    const whereClause = {} //objeto where dinámico, indico qué condiciones aplican en la búsqueda

    if (showOnlyActive) {
        whereClause.active = true;
    }
    
    if (category) {
        whereClause.category = category;
    }

    if (search) {
        whereClause.name = { [Op.like]: `%${search}%`} // Op: operadores de sequialize (gt, like, etc)
    }

    const {rows, count} = await Product.findAndCountAll({
        where: whereClause, //category=bag
        limit, //8
        offset //16
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