let productos = [];
let carrito = [];
let carteras = [];
let accesorios = [];

// Modo oscuro
function darkMode(){
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

function crearCategorias(categorias) {
    const contenedorImg = document.querySelector(".img-categorias");
    contenedorImg.innerHTML = "";

        const imagen = document.createElement("img");
        imagen.id = `img-cartera`;
        imagen.classList.add("categoria-img");
        imagen.src = `./img/acceso_carteras.jpg`;

    //la configuracion va aparte
    //     //le agrego un addEventListener para que al hacer click se redireccione a la pag de la categoria
        imagen.addEventListener("click", () => {
            window.location.href = `./carteras.html`
        });
        contenedorImg.appendChild(imagen);
}


// PENDIENTE
/*// Carrito
document.getElementById("carrito-icono").addEventListener("click", () => {
    const sidebar = document.getElementById("carrito-sidebar");
    sidebar.classList.remove("oculto"); // sacamos la clase oculto
    sidebar.classList.add("visible");   // mostramos el sidebar
});

document.getElementById("btn-cerrar-carrito").addEventListener("click", () => {
    const sidebar = document.getElementById("carrito-sidebar");
    sidebar.classList.remove("visible");
    sidebar.classList.add("oculto");
});*/

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
        botonAgregar.addEventListener("click", () => agregarAlCarrito(producto));
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

function mostrarCarrito(){
    const carritoIcono = document.getElementById("cart-icon");
    const carritoSidebar = document.getElementById('carrito-sidebar');
    const btnCerrarCarrito = document.getElementById('btn-cerrar-carrito');

    carritoIcono.addEventListener('click', () => {
        carritoSidebar.classList.add('mostrar');
        const contenedor = document.getElementById("carrito-items");
        contenedor.innerHTML = "";

        carrito.forEach((producto, index) => {
            const li = document.createElement("li");
            li.classList.add("item-block");
            li.innerHTML = `
                <p class="item-name">${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}</p>
                <button class="delete-button">Eliminar</button>
            `;
            contenedor.appendChild(li);
            const boton = li.querySelector(".delete-button");
            boton.addEventListener('click', () => eliminarDelCarrito(index));
        });
    });

    /*btnCerrarCarrito.addEventListener('click', () => {
        carritoSidebar.classList.remove('mostrar');
    });*/

}

function agregarAlCarrito(producto){
    const productoExistente = carrito.find(item => item.nombre === producto.nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    mostrarCarrito();
}


async function init() {
    await cargarProductos();
    mostrarProductos(productos);
    filtro();
    darkMode();
    crearCategorias();
    mostrarCarrito();
}

init();