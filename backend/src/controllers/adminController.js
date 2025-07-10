import { getProducts, findPk } from "../services/product.service.js";
import { getWithProducts } from "../services/sale.service.js";

export const renderLogin = (req, res) => {
    res.render("adminLogin"); // login.ejs
};

export const renderProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const category = req.query.category || '';
    const search = req.query.search || '';
    const showOnlyActive = false; // o true si querés filtrar solo activos

    try {
        const { products, totalPages } = await getProducts(page, limit, category, search, showOnlyActive);

        res.render("catalog", {
            products,
            totalPages,
            currentPage: page,
            category
        });
    } catch (error) {
        res.status(500).send("Error al cargar productos");
    }
};

export const renderCreateProduct = (req, res) => {
    res.render("createProduct");
};

export const renderUpdateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await findPk(id); // función que ya tenés en el servicio
    if (!product) {
        return res.status(404).send("Producto no encontrado");
    }
    res.render("updateProduct", { product }); // Carga el formulario con los datos del producto
}

export const renderSalesWDetails = async (req, res) => {
    try {
        const sales = await getWithProducts();
        res.render("sales", { sales }); //renderiza sales.ejs
    } catch (error) {
        console.error("Error al cargar ventas: ", error.message);
        res.status(500).send("Error al cargar ventas.");
    }
};