import { DataTypes } from "sequelize"
import sequelize from "../config/db-sequalize.js"

//Tabla SQL
const User = sequelize.define("User", {
    mail: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        primaryKey: true,
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