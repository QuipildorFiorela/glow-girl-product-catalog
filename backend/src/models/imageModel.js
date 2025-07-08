import sequelize from "../config/db-sequelize.js";
import { DataTypes } from "sequelize";

// tabla SQL
const Image = sequelize.define("Image", {
    //columna id
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
export default Image;
