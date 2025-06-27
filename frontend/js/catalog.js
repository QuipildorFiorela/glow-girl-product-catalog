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
    const botonesCat = document.getElementsByClassName("btn-categoria")
    for (let boton of botonesCat) { //recorro los botones de botonesCat, let SIEMPRE, para manejar el boton como una instancia y no como un puntero/referencia
        boton.addEventListener("click", () => {
            if (category == boton.dataset.value) { //si ya estoy en la categoria y vuelvo a hacer click en la misma, salgo
                category = ""
            } else {
                category = boton.dataset.value //si la categoria no es la que estoy seleccionando, abro esa
            }
            mostrarProductos(products) //muestro los productos que coincidan con la categoria que estoy queriendo mostrar
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


async function cargarProductos() {
    const respuesta = await fetch('http://localhost:5000/api/products/json'); //CONEXIÓN A LA BDT EXITOSA
    const data = await respuesta.json(); // fetch espera que el servidor mande un JSON
    products = data.payload; //me traigo todos los productos en una misma lista
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
        const productInCart = cart.find(item => item.name === product.name); //Busca el producto en el carrito
        
        if (productInCart) { //Si está en el carrito, crea los botones para incrementar y descrementar
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

        } else { //Si no está en el carrito, crea el botón de agregar
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

function filtro() {
    const searchBar = document.querySelector(".search-bar");
    searchBar.addEventListener("keyup", () => {
        const texto = quitarTildes(searchBar.value.toLowerCase());
        const filtrados = products.filter(product => quitarTildes(product.nombre.toLowerCase()).includes(texto));
        document.querySelector('.product-grid').innerHTML = '';
        mostrarProductos(filtrados);
    });
}

function quitarTildes(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(cart));
}

function cargarCarrito() {
    const cartSaved = localStorage.getItem("cart");
    if (cartSaved) {
        cart = JSON.parse(cartSaved);
    }
}

function abrirCarrito() {
    const carritoIcono = document.getElementById("cart-icon");
    carritoIcono.addEventListener('click', () => {
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
    await cargarProductos();
    darkMode();
    cargarCarrito();
    mostrarProductos(products);
    filtro();
    abrirCarrito();
    funcionalidadCategorias();
    ventanaUsuario();
}

init();