import Sale from "./saleModel.js";
import Product from "./productModel.js";
import SalesDetail from "./salesdetailModel.js";

// Asociaciones de sequelize: Las claves foráneas se definen con las asociaciones (belongsToMany o belongsTo).
Sale.belongsToMany(Product, { through: SalesDetail, foreignKey: 'saleId' });
Product.belongsToMany(Sale, { through: SalesDetail, foreignKey: 'productId' });

export { Sale, Product, SalesDetail };
