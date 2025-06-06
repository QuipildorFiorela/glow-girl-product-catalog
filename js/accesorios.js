let productos = [];
let carrito = [];

// Modo oscuro
function darkMode() {
    const logoTienda = document.getElementById("logo-tienda");
    const btnColorMode = document.getElementById("btn-mode")
    btnColorMode.addEventListener("click", () => {
        document.body.classList.toggle("modo-oscuro"); //Toggle: interruptor, si no tiene la clase "modo-oscuro" la crea, sino la elimina. La primera vez q toco el boton se pasa a crear la clase

        // Cambiar imagen del botón
        const modoOscuro = document.body.classList.contains("modo-oscuro"); //verifico si el body tiene la clase modo oscuro, guarda true o false
        btnColorMode.src = modoOscuro ? "./img/icons/dark_mode_icon.png" : "./img/icons/light_mode_icon.png"; //si es true modo oscuro : sino modo light
        logoTienda.src = modoOscuro ? "./img/icons/logo_tienda_dark_icon.png" : "./img/icons/logo_tienda_light_icon.png";
    });
}

async function cargarProductos() {
    const respuesta = await fetch('./js/db.json');
    const data = await respuesta.json();
    productos = data.accesorios; // solo accesorios
}


function mostrarProductos(productos) {
    const contenedor = document.querySelector('.product-grid');
    contenedor.innerHTML = "";
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio.toLocaleString('es-AR')}</p>
        `;
        contenedor.appendChild(card);

        // Botón Detalles
        const botonDetalles = document.createElement('button');
        botonDetalles.className = "show-details";
        botonDetalles.textContent = producto.descripcionIsOpen ? 'Ocultar detalles' : 'Mostrar detalles';
        botonDetalles.addEventListener('click', () => {
            producto.descripcionIsOpen = !producto.descripcionIsOpen;
            mostrarProductos(productos);
        });
        card.appendChild(botonDetalles);

        // Si los detalles están abiertos, mostrar más info
        if (producto.descripcionIsOpen) {
            const descripcion = document.createElement("p");
            descripcion.innerHTML = `<strong>Descripción:</strong> ${producto.descripcion}`;
            card.appendChild(descripcion);

        };

        // Botón agregar
        const botonAgregar = document.createElement('button');
        botonAgregar.className = "add-to-cart";
        botonAgregar.innerHTML = `Agregar`
        card.appendChild(botonAgregar);
        botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));
    })
};

function quitarTildes(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

function abrirCarrito() {
    const carritoIcono = document.getElementById("cart-icon");
    carritoIcono.addEventListener('click', () => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        window.location.href = "./carrito.html";
    })
}

function agregarAlCarrito(producto) {
    guardarCarrito();
    const productoExistente = carrito.find(item => item.nombre === producto.nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
}


async function init() {
    await cargarProductos();
    mostrarProductos(productos);
    cargarCarrito();
    darkMode();
    abrirCarrito();
}

init();