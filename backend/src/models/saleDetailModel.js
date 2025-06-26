import { DataTypes } from "sequelize";
import sequelize from "../config/db-sequalize.js";
import Sale from "./saleModel.js";
import Product from "./productModel.js";

const SaleDetail = sequelize.define("SaleDetail", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    saleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    count: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Asociaciones de sequelize: Las claves foráneas se definen con las asociaciones (belongsToMany o belongsTo).
Sale.belongsToMany(Product, { through: SaleDetail, foreignKey: 'saleId' });
Product.belongsToMany(Sale, { through: SaleDetail, foreignKey: 'productId' });

export default SaleDetail;
