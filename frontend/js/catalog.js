let products = [];
let cart = [];
let category = "";

// Modo oscuro
function darkMode() {
    const btnMode = document.getElementById("btn-mode");
    const logoTienda = document.getElementById("logo-tienda");

    // Verificar si ya había un modo guardado
    if (localStorage.getItem("modo") === "oscuro") {
        document.body.classList.add("modo-oscuro");
        btnMode.src = "http://localhost:5000/img/icons/dark_mode_icon.png";
        logoTienda.src = "http://localhost:5000/img/icons/logo_tienda_dark_icon.png";
    }

    btnMode.addEventListener("click", () => {
        const modoActivo = document.body.classList.toggle("modo-oscuro");

        // Cambiar ícono
        btnMode.src = modoActivo ? "http://localhost:5000/img/icons/dark_mode_icon.png" : "http://localhost:5000/img/icons/light_mode_icon.png";
        logoTienda.src = modoActivo ? "http://localhost:5000/img/icons/logo_tienda_dark_icon.png" : "http://localhost:5000/img/icons/logo_tienda_light_icon.png";

        // Guardar en localStorage
        localStorage.setItem("modo", modoActivo ? "oscuro" : "claro");
    });
}

function funcionalidadCategorias() {
    const buttonsCat = document.getElementsByClassName("btn-categoria")
    for (let btn of buttonsCat) { //recorro los botones de botonesCat, let SIEMPRE, para manejar el boton como una instancia y no como un puntero/referencia
        btn.addEventListener("click", () => {
            if (category == btn.dataset.value) { //si ya estoy en la categoria y vuelvo a hacer click en la misma, salgo
                category = ""
            } else {
                category = btn.dataset.value //si la categoria no es la que estoy seleccionando, abro esa
            }
            cargarYMostrar(1); // Vuelvo a cargar desde la página 1 con la categoría seleccionada
        })
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


async function cargarProductos(page = 1) {
    const searchText = document.querySelector(".search-bar").value.trim();

    const url = new URL('http://localhost:5000/api/products'); //conexión a la DB
    url.searchParams.append('page', page);
    if (category) url.searchParams.append('category', category);
    if (searchText) url.searchParams.append('search', searchText);

    const respuesta = await fetch(url);
    const data = await respuesta.json();
    products = data.payload;
    return {
        totalPages: data.totalPages,
        currentPage: data.currentPage
    };
}

function mostrarProductos(products) {
    const contenedor = document.querySelector('.product-grid');
    contenedor.innerHTML = "";

    products.forEach(product => {
        
        if (!product.active) return; // si no está activo, no lo muestres
        if (category != "" && product.category != category) { //si categoria es dif de vacío y la cat del producto no coincide con la que estoy queriendo mostrar
            return; //continua con el siguiente y no muestra el producto cuya cat no coincide con la mostrada
        }

        const card = document.createElement("div");
        card.classList.add("product-card"); 

        card.innerHTML = `
            <img src="http://localhost:5000/${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price.toLocaleString('es-AR')}</p>
        `;
        contenedor.appendChild(card);

        // Botón Detalles
        const botonDetalles = document.createElement('button');
        botonDetalles.className = "show-details";
        botonDetalles.textContent = product.descriptionIsOpen ? 'Ocultar detalles' : 'Mostrar detalles';
        botonDetalles.addEventListener('click', () => {
            product.descriptionIsOpen = !product.descriptionIsOpen;
            mostrarProductos(products);
        });
        card.appendChild(botonDetalles);

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
            countControl.className = "cantidad-control"
            countControl.innerHTML = `
                <button class="decrementar">-</button>
                <span>${productInCart.count}</span>
                <button class="incrementar">+</button>
            `;
            card.appendChild(countControl);

            countControl.querySelector(".incrementar").addEventListener('click', () => { //Si toco +, aumento la cantidad
                productInCart.count++;
                guardarCarrito();
                mostrarProductos(products);
            });

            countControl.querySelector(".decrementar").addEventListener('click', () => { //Si toco -, dismuniye la cantidad
                productInCart.count--;
                if (productInCart.count <= 0) {
                    cart = cart.filter(item => item.name !== product.name);
                }
                guardarCarrito();
                mostrarProductos(products);
            });

        } else { //Si no está en el cart, crea el botón de agregar
            const botonAgregar = document.createElement('button');
            botonAgregar.className = "add-to-cart";
            botonAgregar.innerHTML = `Agregar`;
            card.appendChild(botonAgregar);
            botonAgregar.addEventListener("click", () => {
                agregarAlCarrito(product);
                mostrarProductos(products);
            });
        }
    })
};

function renderPagination(totalPages, currentPage) {
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    // Botón anterior
    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Anterior';
        prevButton.addEventListener('click', () => cargarYMostrar(currentPage - 1));
        paginationContainer.appendChild(prevButton);
    }

    // Numeritos de página
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.disabled = true;
            pageButton.classList.add('pagina-actual');
        }
        pageButton.addEventListener('click', () => cargarYMostrar(i));
        paginationContainer.appendChild(pageButton);
    }

    // Botón siguiente
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Siguiente';
        nextButton.addEventListener('click', () => cargarYMostrar(currentPage + 1));
        paginationContainer.appendChild(nextButton);
    }
}

async function cargarYMostrar(page = 1) {
    const { totalPages, currentPage } = await cargarProductos(page);
    mostrarProductos(products);
    renderPagination(totalPages, currentPage);
}

function filter() {
    const searchBar = document.querySelector(".search-bar");
    searchBar.addEventListener("keyup", () => {
        cargarYMostrar(1); // Cada vez que escribo, vuelve a cargar desde la página 1
    });
}

function removeAccents(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function guardarCarrito() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function cargarCarrito() {
    const cartSaved = localStorage.getItem("cart");
    if (cartSaved) {
        cart = JSON.parse(cartSaved);
    }
}

function abrirCarrito() {
    const cartIcon = document.getElementById("cart-icon");
    cartIcon.addEventListener('click', () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = "./cart.html";
    })
}

function agregarAlCarrito(product) {
    const availbleProduct = cart.find(item => item.name === product.nombre);
    if (availbleProduct) {
        availbleProduct.count++;
    } else {
        cart.push({ ...product, count: 1 });
    }
    guardarCarrito();
    mostrarProductos(products);
}

function ventanaUsuario() {
    const iconoUsuario = document.getElementById("icono-usuario");
    const ventana = document.getElementById("ventana-usuario");
    const nombreUsuario = document.getElementById("nombre-usuario");
    const cerrarSesionBtn = document.getElementById("cerrar-sesion");

    const nombreGuardado = localStorage.getItem("nombreUsuario") || "Invitado";
    nombreUsuario.textContent = nombreGuardado;

    iconoUsuario.addEventListener("click", () => {
        ventana.classList.toggle("oculto");
    });

    cerrarSesionBtn.addEventListener("click", () => {
        localStorage.removeItem("nombreUsuario");
        localStorage.removeItem("cart");
        window.location.href = "./login.html";
    });

    // Cerrar la ventana si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".usuario").contains(e.target)) {
            ventana.classList.add("oculto");
        }
    });
}

async function init() {
    await cargarYMostrar(1);
    darkMode();
    cargarCarrito();
    filter();
    abrirCarrito();
    funcionalidadCategorias();
    ventanaUsuario();
}

init();