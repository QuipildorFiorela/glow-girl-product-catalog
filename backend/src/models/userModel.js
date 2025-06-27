
import { DataTypes } from "sequelize"
import sequelize from "../config/db-sequalize.js"

//Tabla SQL
const User = sequelize.define("User", {
    //columna id
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    //columna firsName
    firstName:{
        type:DataTypes.STRING,
        allowNull: true,
    },
    //columna email
    email: {
        type: DataTypes.STRING,
        validate:{
            isEmail: true,
        },
        unique: true,
    },
    password: { type: DataTypes.STRING },
    status:{
        type:DataTypes.BOOLEAN,
        defaultValue: false
    }
})
export default User;