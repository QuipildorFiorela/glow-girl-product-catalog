import { DataTypes } from "sequelize";
import sequelize from "../config/db-sequelize.js";
import Sale from "./saleModel.js";
import Product from "./productModel.js";

const SalesDetail = sequelize.define("SalesDetail", {
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

export default SalesDetail;
