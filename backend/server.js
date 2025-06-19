import express from "express";
import { join, __dirname } from "./src/utils/index.js";
import productRoute from "./src/routes/productRoute.js";
import sequelize from "./src/config/db-sequalize.js";
import envs from "./src/config/envs.js";

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
//pool.getConnection();

//routes
/*app.get("/", (req, res) => {
    res.json({ title: "Home Page" });
});*/
import { getAllProducts } from "./src/controllers/productController.js";
app.get("/", getAllProducts);
app.use("/api/products", productRoute);


//listeners
initializeConnection();
app.listen(app.get("PORT"), () => {
    console.log(`Server on port http://localhost:${app.get("PORT")}`);
});


/*import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import ProductRouter from "./src/routes/productRoute.js";

const app = express();
const PORT = 5000;

// Para poder usar __dirname con ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware para parsear JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public'))); //vuelvo a la carpeta public estatica

// Configurar EJS y carpeta de vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Rutas
app.use("/api/productos", ProductRouter); // para API de productos
// Agregá un router para admin más adelante, como "/admin", si usás otro archivo

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});*/