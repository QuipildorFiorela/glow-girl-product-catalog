import { DataTypes } from "sequelize"
import sequelize from "../config/db-sequelize.js"

//Tabla SQL
const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    mail: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    name: {
        type: DataTypes.STRING(10),
        allowNull: false  
    },
    password: {
        type: DataTypes.TEXT('tiny'),
        allowNull: false
    }
}, {
    tableName: "users",
    timestamps: false
});
export default User;