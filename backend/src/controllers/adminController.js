import { getProducts } from "../services/product.service.js";

const renderLogin = (req, res) => {
    res.render("adminLogin"); // login.ejs
};

const renderProductList = async (req, res) => {
    try {
        const products = await getProducts();
        res.render("products", { products });
    } catch (error) {
        console.error("Error al obtener productos:", error);
        res.status(500).send("Error al cargar los productos");
    }
};

const renderCreateProduct = (req, res) => {
    res.render("createProduct");
};

export default { renderLogin, renderProductList, renderCreateProduct };
