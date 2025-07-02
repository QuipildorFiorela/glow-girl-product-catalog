import { Sale, Product, SalesDetail } from "../models/associations.js"; // <-- Importo ya con las relaciones hechas


export const getSales = async () => {
    return await Sale.findAll();
};

export const create = async (datosSale) => {
    return await Sale.create(datosSale);
}; //para hacer el POST desde el front
//ARREGLAR hay que mandar los datos a un middleware, hay que hacer la venta, los detalles etc, producto checker, venta checker,.......?

export const getSalesWProducts = async () => {
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
