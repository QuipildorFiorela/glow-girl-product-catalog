import express from "express";
import { join, __dirname } from "./src/utils/index.js";
import productRoute from "./src/routes/productRoute.js";
import sequelize from "./src/config/db-sequalize.js";
import envs from "./src/config/envs.js";
import cors from "cors";

//settings
const app = express();
app.set("views", join(__dirname, "views"));      // Carpeta donde están las vistas
app.set("view engine", "ejs");                // Motor de vistas a usar

app.set("PORT", envs.port || 3000);
const initializeConnection = async () => {
    try {
        await sequelize.sync();
        console.log("Database sincronizada");

    } catch (error) {
        console.log(error);
    }
}

// middlewares
app.use(express.json());
app.use(express.static(join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//pool.getConnection();
app.use("/api/products", productRoute);


//listeners
initializeConnection();
app.listen(app.get("PORT"), () => {
    console.log(`Server on port http://localhost:${app.get("PORT")}`);
});