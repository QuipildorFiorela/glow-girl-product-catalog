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

const renderUploadProduct = async (req, res) => {
    const { id } = req.params;
    const product = await findPk(id); // función que ya tenés en el servicio

    if (!product) {
        return res.status(404).send("Producto no encontrado");
    }

    res.render("uploadProduct", { product }); // Carga el formulario con los datos del producto
}

export default { renderLogin, renderProductList, renderCreateProduct, renderUploadProduct };
