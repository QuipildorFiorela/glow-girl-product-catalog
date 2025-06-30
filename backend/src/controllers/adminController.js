import { getProducts, findPk } from "../services/product.service.js";

const renderLogin = (req, res) => {
    res.render("adminLogin"); // login.ejs
};

export const renderProducts = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const category  = req.query.category || '';
    const search = req.query.search || '';

    try {
        const data = await getProducts(page, limit, category, search);

        res.render("products", {
            products: data.products,
            totalPages: data.totalPages,
            currentPage: data.currentPage
        });
    } catch (error) {
        res.status(500).send("Error al cargar los productos");
    }
};

const renderCreateProduct = (req, res) => {
    res.render("createProduct");
};

const renderUpdateProduct = async (req, res) => {
    const { id } = req.params;
    const product = await findPk(id); // función que ya tenés en el servicio
    if (!product) {
        return res.status(404).send("Producto no encontrado");
    }
    res.render("updateProduct", { product }); // Carga el formulario con los datos del producto
}

export default { renderLogin, renderProducts, renderCreateProduct, renderUpdateProduct };
