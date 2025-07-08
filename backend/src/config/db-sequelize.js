import { Sequelize } from "sequelize"
import envs from "./envs.js";
const { host, user, password, database, port } = envs.db_config;
const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: "mysql",
    port: port,
})

try {
    await sequelize.authenticate();
    console.log("Database is connected with SEQUELIZE");
} catch (error) {
    console.log(error);
}

export default sequelize;