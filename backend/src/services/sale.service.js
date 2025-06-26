import Sale from "../models/saleModel.js"

export const getSales = async () => {
    return await Sale.findAll();
};

export const create = async (datosSale) => {
    return await Sale.create(datosSale);
}; //para hacer el POST desde el front

export const getSalesWithProducts = async () => {
    const sales = await Sale.findAll({
        include: [{
            model: Product,
            through: {
                attributes: ['cantidad', 'subtotal']
            }
        }]
    });
    return sales;
};