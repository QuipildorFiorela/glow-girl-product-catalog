let productos = [];
let carrito = [];
let categoria = "";

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
            if (categoria == boton.dataset.value) { //si ya estoy en la categoria y vuelvo a hacer click en la misma, salgo
                categoria = ""
            } else {
                categoria = boton.dataset.value //si la categoria no es la que estoy seleccionando, abro esa
            }
            mostrarProductos(productos) //muestro los productos que coincidan con la categoria que estoy queriendo mostrar
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
    productos = data.payload; //me traigo todos los productos en una misma lista
}

function mostrarProductos(productos) {
    const contenedor = document.querySelector('.product-grid');
    contenedor.innerHTML = "";

    productos.forEach(producto => {
        if (!producto.activo) return; // si no está activo, no lo muestres
        if (categoria != "" && producto.categoria != categoria) { //si categoria es dif de vacío y la cat del producto no coincide con la que estoy queriendo mostrar
            return; //continua con el siguiente y no muestra el producto cuya cat no coincide con la mostrada
        }

        const card = document.createElement("div");
        card.classList.add("product-card"); 

        card.innerHTML = `
            <img src="http://localhost:5000/${producto.img}" alt="${producto.nombre}">
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
        const productoEnCarrito = carrito.find(item => item.nombre === producto.nombre); //Busca el producto en el carrito
        
        if (productoEnCarrito) { //Si está en el carrito, crea los botones para incrementar y descrementar
            const cantidadControl = document.createElement("div");
            cantidadControl.className = "cantidad-control"
            cantidadControl.innerHTML = `
                <button class="decrementar">-</button>
                <span>${productoEnCarrito.cantidad}</span>
                <button class="incrementar">+</button>
            `;
            card.appendChild(cantidadControl);

            cantidadControl.querySelector(".incrementar").addEventListener('click', () => { //Si toco +, aumento la cantidad
                productoEnCarrito.cantidad++;
                guardarCarrito();
                mostrarProductos(productos);
            });

            cantidadControl.querySelector(".decrementar").addEventListener('click', () => { //Si toco -, dismuniye la cantidad
                productoEnCarrito.cantidad--;
                if (productoEnCarrito.cantidad <= 0) {
                    carrito = carrito.filter(item => item.nombre !== producto.nombre);
                }
                guardarCarrito();
                mostrarProductos(productos);
            });

        } else { //Si no está en el carrito, crea el botón de agregar
            const botonAgregar = document.createElement('button');
            botonAgregar.className = "add-to-cart";
            botonAgregar.innerHTML = `Agregar`;
            card.appendChild(botonAgregar);
            botonAgregar.addEventListener("click", () => {
                agregarAlCarrito(producto);
                mostrarProductos(productos);
            });
        }
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
    const productoExistente = carrito.find(item => item.nombre === producto.nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
    mostrarProductos(productos);
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
        localStorage.removeItem("carrito");
        window.location.href = "./acceso.html";
    });

    // Cerrar la ventana si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".usuario").contains(e.target)) {
            ventana.classList.add("oculto");
        }
    });
}

//POSIBLE SLIDEBAR

// CREACIÓN
/*document.getElementById("carrito-icono").addEventListener("click", () => {
    const sidebar = document.getElementById("carrito-sidebar");
    sidebar.classList.remove("oculto"); // sacamos la clase oculto
    sidebar.classList.add("visible");   // mostramos el sidebar
});

document.getElementById("btn-cerrar-carrito").addEventListener("click", () => {
    const sidebar = document.getElementById("carrito-sidebar");
    sidebar.classList.remove("visible");
    sidebar.classList.add("oculto");
});*/

// AL APRETAR EL ÍCONO
/*const carritoSidebar = document.getElementById('carrito-sidebar');
const btnCerrarCarrito = document.getElementById('btn-cerrar-carrito');

carritoIcono.addEventListener('click', () => {
    carritoSidebar.classList.add('mostrar');
})

btnCerrarCarrito.addEventListener("click", () => {
    carritoSidebar.classList.remove("mostrar")
})*/


async function init() {
    await cargarProductos();
    darkMode();
    cargarCarrito();
    mostrarProductos(productos);
    filtro();
    abrirCarrito();
    funcionalidadCategorias();
    ventanaUsuario();
}

init();