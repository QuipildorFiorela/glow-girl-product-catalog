import express from "express";
import ProductRouter from "./src/routes/Product.route.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use("/", ProductRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
