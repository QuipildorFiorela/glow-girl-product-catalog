import { DataTypes } from "sequelize";
import sequelize from "../config/db-sequalize.js";

// Tabla SQL ventas
const Sale = sequelize.define("Sale", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    buyerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    total: {
        type: DataTypes.DOUBLE,
        allowNull: false }
});

export default Sale;