let productos = [];
let carrito = [];
let carteras = [];
let accesorios = [];

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

function funcionalidadCategoriass() { 
    document.getElementById("categoria-carteras").addEventListener("click", () => {
    window.location.href = "./carteras.html";
    });

    document.getElementById("categoria-accesorios").addEventListener("click", () => {
    window.location.href = "./accesorios.html";
    });
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

function abrirCarrito() {
    const carritoIcono = document.getElementById("cart-icon");
    const carritoSidebar = document.getElementById('carrito-sidebar');
    const btnCerrarCarrito = document.getElementById('btn-cerrar-carrito');

    carritoIcono.addEventListener('click', () => {
        carritoSidebar.classList.add('mostrar');
    })

    btnCerrarCarrito.addEventListener("click", () => {
        carritoSidebar.classList.remove("mostrar")
    })

    mostrarCarrito();
}

function mostrarCarrito() {
    const contenedor = document.getElementById("carrito-items");
    contenedor.innerHTML = "";

    carrito.forEach((producto, indice) => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("item-block");

        divProducto.innerHTML = `
            <img src="${producto.img}" class="modo-icono">
            <div class="item-info">
                <h5>${producto.nombre}</h5> 
                <h6>Cantidad: ${producto.cantidad}</h6>
                <h4>$${(producto.precio * producto.cantidad).toLocaleString('es-AR')}</h4>
            </div>
            <div class="cantidad-control">
                <button class="decrementar">-</button>
                <span>${producto.cantidad}</span>
                <button class="incrementar">+</button>
            </div>
            <img class="delete-button" src= "./img/icons/trash_icon.png" alt="Eliminar">
            `;
            
            //<button class="delete-button">🗑️</button>
        contenedor.appendChild(divProducto);

        // Eventos
        divProducto.querySelector(".delete-button").addEventListener('click', () => eliminarDelCarrito(indice));
        divProducto.querySelector(".incrementar").addEventListener('click', () => {
            producto.cantidad++;
            mostrarCarrito();
        });
        divProducto.querySelector(".decrementar").addEventListener('click', () => {
            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                carrito.splice(indice, 1);
            }
            actualizarTotal();
            mostrarCarrito();
        });
    });
}

function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.nombre === producto.nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    actualizarTotal();
    mostrarCarrito();
}

function eliminarDelCarrito(indice){
    carrito.splice(indice, 1);
    actualizarTotal();
    mostrarCarrito();
}

function actualizarTotal(){
    let precioTotal = 0;
    carrito.forEach(producto => {
        precioTotal += (producto.precio * producto.cantidad);
    });
    document.getElementById("total-price").textContent = `$${precioTotal}`;
}


async function init() {
    await cargarProductos();
    mostrarProductos(productos);
    filtro();
    darkMode();
    abrirCarrito();
    funcionalidadCategoriass();
}

init();