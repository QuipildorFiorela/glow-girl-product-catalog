import { DataTypes } from "sequelize";
import sequelize from "../config/db-sequalize.js";

//Tabla SQL
const Product = sequelize.define("Product", {
    //columna id
    id: {
        // FALTA USAR crypto.randomUUID() PARA EL ID!!!!!!!!!!!!!!!!!!!!;
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    //columna firsName
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //columna lastName
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //columna email
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    //columna img
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //categoria
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    //activo
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
});

export default Product;