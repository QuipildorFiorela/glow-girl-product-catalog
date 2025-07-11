import Product from "../models/productModel.js"
import { Op } from "sequelize"; //permite hacer busquedas con comodines (LIKE) para el filtro por busqueda

export const getProducts = async (page = 1, limit = 8, category = '', search = '', showOnlyActive = false) => {
    const offset = (page - 1) * limit; //desde qué producto empiezo a traer (si el offset es 8, trae a partir del 9 al 16)
    const whereClause = {} //en sequelize whereClause es un objeto que representa las condiciones WHERE de la consulta SQL, indico qué condiciones aplican en la búsqueda. Se va llenando dinámicamente dependiendo de los filtros que lleguen desde el frontend o el controller.

    if (showOnlyActive) {
        whereClause.active = true;
    } // ?active=true para el cliente

    if (category) {
        whereClause.category = category;
    }

    if (search) {
        whereClause.name = { [Op.like]: `%${search}%` } //Si llega ?search=tote, esto se traduce a: WHERE name LIKE '%tote%'
    }

    //rows=prod de esa pág, count=cant total de prod que coinciden con los filtros
    const { rows, count } = await Product.findAndCountAll({
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

export const remove = async (id) => {
    return await Product.destroy({ where: { id } })
}