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
        type: DateTypes.INTEGER,
        autoIncrement: true,
        foreignKey: true,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        foreignKey: true,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Asociaciones
Sale.belongsToMany(Product, { through: SaleDetail, foreignKey: 'saleId' });
Product.belongsToMany(Sale, { through: SaleDetail, foreignKey: 'productId' });

export default SaleDetail;
