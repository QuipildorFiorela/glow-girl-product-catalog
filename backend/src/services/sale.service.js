import Sale from "../models/saleModel.js"

export const getSales = async () => {
    return await Sale.findAll();
};

export const create = async (datosSale) => {
    return await Sale.create(datosSale);
}; //para hacer el POST desde el front

export const getSalesWithProducts = async () => {
    const sales = await Sale.findAll({ //Uso Sequelize para buscar todas las filas de la tabla Sale
        include: [{ 
            model: Product, //Le dijo a Sequelize que además de las ventas, traiga los productos relacionados a cada venta, gracias a la relación belongsToMany configurada entre Sale y Product a través de la tabla intermedia SaleDetail.
            through: { //indico que tambien traiga los datos de la tabla intermedia y especifico el campo
                attributes: ['cantidad']
            }
        }] // estoy diciendo: “Traeme todas las ventas y cada una con sus productos asociados, incluyendo la cantidad desde la tabla intermedia.”
    });
    return sales; //Devuelve un array de objetos. Cada objeto representa una venta con un array de productos dentro.
};