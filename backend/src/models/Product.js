import { DataTypes } from "sequelize";
import sequelize from "../config/db-sequalize.js";

//Tabla SQL
const Product = sequelize.define("Product", {
    //columna id
    id: {
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
}, {
    tableName: "productos", // 👈 ¡Agregá esta línea!
    timestamps: false       // 👈 y esta también si tu tabla no tiene createdAt/updatedAt
});

export default Product;

/*export default class Producto{
    constructor(nombre, descripcion, precio, img, categoria){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.img = img;
        this.categoria = categoria;
    }
}*/