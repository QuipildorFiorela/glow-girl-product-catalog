let productos = [];
let accesorios = [];
let carteras = [];
let carrito = [];

// Modo oscuro
const icono = document.getElementById("logo-tienda");
const btnMode = document.getElementById("btn-mode").addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro"); //Agrega la clase modo-oscuro si no está. La quita si ya estaba.

    // Cambiar imagen del botón
    const modoOscuro = document.body.classList.contains("modo-oscuro");
    btnMode.src = modoOscuro ? "./img/icons/dark_mode_icon.png" : "./img/icons/light_mode_icon.png";
    icono.src = modoOscuro ? "./img/icons/logo_tienda_dark_icon.png" : "./img/icons/logo_tienda_light_icon.png";
});

// Carrito
document.getElementById("carrito-icono").addEventListener("click", () => {
    const sidebar = document.querySelector(".cart-section");
    sidebar.classList.add("visible");
});

async function cargarProductos() {
    const respuesta = await fetch('./js/db.json');
    const data = await respuesta.json();
    accesorios = data.accesorios;
    carteras = data.carteras;
    productos = [
        ...accesorios,
        ...carteras,
    ];
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
    })
};

function filtro() {
    const searchBar = document.querySelector(".search-bar");
    searchBar.addEventListener("keyup", () => {
        const texto = quitarTildes(searchBar.value.toLowerCase());
        const filtrados = productos.filter(producto => quitarTildes(producto.nombre.toLowerCase()).includes(texto));
        document.querySelector('.product-grid').innerHTML = '';
        mostrarProductos(filtrados);
    });
}

function quitarTildes(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}



async function init() {
    await cargarProductos();
    mostrarProductos(productos);
    filtro();
}

init();