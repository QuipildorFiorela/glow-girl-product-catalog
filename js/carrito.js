let carrito = [];

function darkMode() {
    const btnMode = document.getElementById("btn-mode");
    const logoTienda = document.getElementById("logo-tienda");

    // Verificar si ya había un modo guardado
    if (localStorage.getItem("modo") === "oscuro") {
        document.body.classList.add("modo-oscuro");
        btnMode.src = "./img/icons/dark_mode_icon.png";
        logoTienda.src= "./img/icons/logo_tienda_dark_icon.png";
    }

    btnMode.addEventListener("click", () => {
        const modoActivo = document.body.classList.toggle("modo-oscuro");
        
        // Cambiar ícono
        btnMode.src = modoActivo ? "./img/icons/dark_mode_icon.png" : "./img/icons/light_mode_icon.png";
        logoTienda.src = modoActivo ? "./img/icons/logo_tienda_dark_icon.png" : "./img/icons/logo_tienda_light_icon.png";

        // Guardar en localStorage
        localStorage.setItem("modo", modoActivo ? "oscuro" : "claro");
    });
}


function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarTotal();
    }
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCarrito() {
    const contenedor = document.querySelector(".carrito-items");
    const contenedorBoton = document.querySelector(".btn-container");
    contenedor.innerHTML = "";
    contenedorBoton.innerHTML = "";

    if (carrito.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No hay elementos en el carrito.";
        contenedor.appendChild(mensaje);
        return;
    }

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

        contenedor.appendChild(divProducto);
        contenedor.appendChild(divProducto);

        // Eventos
        divProducto.querySelector(".delete-button").addEventListener('click', () => eliminarDelCarrito(indice));
        divProducto.querySelector(".incrementar").addEventListener('click', () => {
            producto.cantidad++;
            actualizarCarrito();
        });
        divProducto.querySelector(".decrementar").addEventListener('click', () => {
            if (producto.cantidad > 1) {
                producto.cantidad--;
            } else {
                carrito.splice(indice, 1);
            }
            actualizarCarrito();
        });
    });

    // Botón finalizar compra
    const btnFinalizarCompra = document.createElement("button");
    btnFinalizarCompra.classList = "finalizar-compra";
    btnFinalizarCompra.textContent = "Finalizar Compra";
    contenedorBoton.appendChild(btnFinalizarCompra);
}

function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    actualizarTotal();
    guardarCarrito();
    mostrarCarrito();
}

function actualizarTotal() {
    let precioTotal = 0;
    carrito.forEach(producto => {
        precioTotal += (producto.precio * producto.cantidad);
    });
    document.getElementById("subtotal-precio").textContent = `$${precioTotal.toLocaleString('es-AR')}`;
}

function ventanaUsuario() {
    const iconoUsuario = document.getElementById("icono-usuario");
    const ventana = document.getElementById("ventana-usuario");
    const nombreUsuario = document.getElementById("nombre-usuario");
    const cerrarSesionBtn = document.getElementById("cerrar-sesion");

    // Supongamos que guardaste el nombre en localStorage con la clave "nombreUsuario"
    const nombreGuardado = localStorage.getItem("nombreUsuario") || "Invitado";
    nombreUsuario.textContent = nombreGuardado;

    iconoUsuario.addEventListener("click", () => {
        ventana.classList.toggle("oculto");
    });

    cerrarSesionBtn.addEventListener("click", () => {
        localStorage.removeItem("nombreUsuario");
        localStorage.removeItem("carrito");
        window.location.href = "./acceso.html"; // Cambiar a la ruta de tu inicio
    });

    // Cerrar la ventana si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".usuario").contains(e.target)) {
            ventana.classList.add("oculto");
        }
    });
}

function init() {
    darkMode();
    cargarCarrito();
    mostrarCarrito();
    ventanaUsuario();
}

init();