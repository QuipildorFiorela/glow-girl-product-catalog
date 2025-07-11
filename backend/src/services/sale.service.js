import { Sale, Product, SalesDetail } from "../models/associations.js"; // <-- Importo ya con las relaciones hechas


export const getSales = async () => {
    return await Sale.findAll();
};

export const getWithDetails = async () => {
    const sales = await Sale.findAll({ 
        include: [{ //"Traeme las ventas, pero además, traeme todos los productos que están relacionados a cada venta", gracias a la relación belongsToMany configurada entre Sale y Product a través de la tabla intermedia SaleDetail
            model: Product,
            through: { 
                attributes: ['count'] 
            }
        }] // “Traeme todas las ventas y cada una con sus productos asociados, incluyendo la cantidad desde la tabla intermedia.”
    });
    return sales; //Devuelve un array de objetos. Cada objeto representa una venta con un array de productos dentro.
};
export const findPk = async (id) => {
    return await Sale.findByPk(id, {
        include: [
        {
            model: Product,
            through: {
            model: SalesDetail,
            attributes: ["count"]
            },
            attributes: ["name", "price"]
        }
        ]
    });
};

export const create = async (datosSale) => {
    return await Sale.create(datosSale);
}; 
