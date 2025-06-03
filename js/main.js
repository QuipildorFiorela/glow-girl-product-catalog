let productos = [];
let accesorios = [];
let carteras = [];

const btnMode = document.getElementById("btn-mode");
const icono = document.getElementById("icono");
btnMode.addEventListener("click", () => {
    document.body.classList.toggle("modo-oscuro"); //Agrega la clase modo-oscuro si no está. La quita si ya estaba.

    // Cambiar imagen del botón
    const modoOscuro = document.body.classList.contains("modo-oscuro");
    btnMode.src = modoOscuro ? "./img/icons/dark_mode_icon.png" : "./img/icons/light_mode_icon.png";
    icono.src = modoOscuro ? "./img/logo_tienda2.png" : "./img/logo_tienda3.png";
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
            <p>$${producto.precio}</p>
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



async function init() {
    await cargarProductos();
    console.log(productos);
    mostrarProductos(productos);
}

init();