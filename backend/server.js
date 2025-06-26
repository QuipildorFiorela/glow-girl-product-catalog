import express from "express";
import sequelize from "./src/config/db-sequalize.js";
import cors from "cors";
import { join, __dirname } from "./src/utils/index.js";
import productRouter from "./src/routes/productRoute.js";
import saleRouter from "./src/routes/saleRoute.js";
import adminRouter from "./src/routes/adminRoute.js";
import envs from "./src/config/envs.js";


//settings
const app = express();
app.set("PORT", envs.port || 3000);

app.set("view engine", "ejs");                // Motor de vistas a usar
app.set("views", join(__dirname, "views"));      // Carpeta donde están las vistas

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
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, "public")));
app.use(cors());
//pool.getConnection();
app.use("/api/products", productRouter);
app.use("/api/admin", adminRouter);
app.use("/api/sales", saleRouter);

//listeners
initializeConnection();
app.listen(app.get("PORT"), () => {
    console.log(`Server on port http://localhost:${app.get("PORT")}`);
});