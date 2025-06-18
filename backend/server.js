import express from "express";
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
app.use("/productos", ProductRouter); // para API de productos
// Agregá un router para admin más adelante, como "/admin", si usás otro archivo

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});