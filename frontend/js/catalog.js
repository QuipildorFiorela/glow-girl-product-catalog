import { redirectIfNotLogged } from "./utils.js"
import { darkMode, showUserWindow } from "../js/utils.js"
let products = [];
let cart = [];
let category = "";
const savedPage = getSavedPage();

function btnCategories() {
    const btnsCat = document.getElementsByClassName("btn-category");
    for (let btn of btnsCat) {
        btn.addEventListener("click", () => {
            const container = btn.parentElement;

            if (category == btn.dataset.value) {
                category = "";
                container.classList.remove("selected");
            } else {
                // Quito la clase de todas las categorías
                const categories = document.getElementsByClassName("category");
                for (let cat of categories) {
                    cat.classList.remove("selected");
                }
                // Asigno la nueva
                category = btn.dataset.value;
                container.classList.add("selected");
            }
            loadAndShow(1);
        });
    }
}

// window.addEventListener("scroll", () => {
// const navbar = document.querySelector(".navbar");
// if (window.scrollY > 100) {
// navbar.classList.add("shrink");
// } else {
// navbar.classList.remove("shrink");
// }
// });

async function loadProducts(page = 1) {
    const searchText = document.getElementById("searchBar").value.trim();

    const url = new URL('http://localhost:5000/api/products');
    url.searchParams.append('page', page);
    url.searchParams.append('active', 'true'); // <-- esto filtra activos
    if (category) url.searchParams.append('category', category);
    if (searchText) url.searchParams.append('search', searchText);


    const respuesta = await fetch(url); // GET /api/products?page=1&active=true&category=...&search=...
    const data = await respuesta.json();
    products = data.payload;
    return {
        totalPages: data.totalPages,
        currentPage: data.currentPage
    };
}

function showProducts(products) {
    const container = document.getElementById('productGrid');
    container.innerHTML = "";
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="http://localhost:5000/img/products/${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toLocaleString('es-AR')}</p>
        `;
        container.appendChild(card);

        // Botón Detalles
        const btnDetails = document.createElement('button');
        btnDetails.className = "btn-purple";
        btnDetails.textContent = product.descriptionIsOpen ? 'Ocultar detalles' : 'Mostrar detalles';
        btnDetails.addEventListener('click', () => {
            product.descriptionIsOpen = !product.descriptionIsOpen;
            showProducts(products);
        });

        const btnContainer = document.createElement("div");
        btnContainer.className = "btn-container"
        btnContainer.appendChild(btnDetails);
        // Si los detalles están abiertos, mostrar más info
        if (product.descriptionIsOpen) {
            const description = document.createElement("p");
            description.innerHTML = `<strong>Descripción:</strong> ${product.description}`;
            card.appendChild(description);
        };

        // Botón agregar
        const productInCart = cart.find(item => item.name === product.name); //Busca el producto en el cart

        if (productInCart) { //Si está en el cart, crea los botones para incrementar y descrementar
            const countControl = document.createElement("div");
            countControl.className = "amount-control"
            countControl.innerHTML = `
                <button class="decrease">-</button>
                <span>${productInCart.count}</span>
                <button class="increase">+</button>
            `;
            btnContainer.appendChild(countControl);

            countControl.querySelector(".increase").addEventListener('click', () => { //Si toco +, aumento la cantidad
                productInCart.count++;
                saveCart();
                showProducts(products);
            });

            countControl.querySelector(".decrease").addEventListener('click', () => { //Si toco -, dismuniye la cantidad
                productInCart.count--;
                if (productInCart.count <= 0) {
                    cart = cart.filter(item => item.name !== product.name);
                }
                saveCart();
                showProducts(products);
            });
        } else { //Si no está en el cart, crea el botón de agregar
            const btnAdd = document.createElement('button');
            btnAdd.className = "btn-pink";
            btnAdd.innerHTML = `Agregar`;
            btnContainer.appendChild(btnAdd);
            btnAdd.addEventListener("click", () => {
                addToCart(product);
                showProducts(products);
            });
        }
        card.appendChild(btnContainer);
    })
};

function renderPagination(totalPages) {
    const currentPage = getSavedPage();
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    // Botón anterior
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Anterior';
        prevButton.addEventListener('click', () => loadAndShow(currentPage - 1));
        paginationContainer.appendChild(prevButton);
    }

    // Numeritos de página
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.disabled = true;
            pageButton.classList.add('actual-page');
        }
        pageButton.addEventListener('click', () => loadAndShow(i));
        paginationContainer.appendChild(pageButton);
    }

    // Botón siguiente
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Siguiente';
        nextButton.addEventListener('click', () => loadAndShow(currentPage + 1));
        paginationContainer.appendChild(nextButton);
    }
}

function savePage(page) {
    sessionStorage.setItem('actualPage', page);
}

function getSavedPage() {
    return parseInt(sessionStorage.getItem('actualPage')) || 1;
}

async function loadAndShow(page) {
    savePage(page);  //Guarda la página cada vez que cambia
    const data = await loadProducts(page);
    showProducts(products);
    renderPagination(data.totalPages);
}

function filter() {
    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("keyup", () => {
        loadAndShow(1); // Cada vez que escribo, vuelve a cargar desde la página 1
    });
}

function saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const cartSaved = sessionStorage.getItem("cart");
    if (cartSaved) {
        cart = JSON.parse(cartSaved);
    }
}

function openCart() {
    const cartIcon = document.getElementById("cartIcon");
    cartIcon.addEventListener('click', () => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = "./cart.html";
    })
}

function addToCart(product) {
    const availbleProduct = cart.find(item => item.name === product.nombre);
    if (availbleProduct) {
        availbleProduct.count++;
    } else {
        cart.push({ ...product, count: 1 });
    }
    saveCart();
    showProducts(products);
}

async function init() {
    redirectIfNotLogged();
    loadCart();
    await loadAndShow(savedPage);
    darkMode();
    filter();
    openCart();
    btnCategories();
    showUserWindow();
}

init();