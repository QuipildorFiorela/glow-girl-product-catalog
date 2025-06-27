let cart = [];

function btnLogo(){
    const btnVolverInicio = document.getElementById("logo-tienda");
    btnVolverInicio.addEventListener("click", () => {
        window.location.href = "./catalog.html"
    })
}

function darkMode() {
    const btnMode = document.getElementById("btn-mode");
    const logoTienda = document.getElementById("logo-tienda");

    // Verificar si ya había un modo guardado
    if (localStorage.getItem("modo") === "oscuro") {
        document.body.classList.add("modo-oscuro");
        btnMode.src = "http://localhost:5000/img/icons/dark_mode_icon.png";
        logoTienda.src= "http://localhost:5000/img/icons/logo_tienda_dark_icon.png";
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


function cargarCarrito() {
    const cartGuardado = localStorage.getItem("cart");
    if (cartGuardado) {
        cart = JSON.parse(cartGuardado);
        actualizarTotal();
    }
}

function guardarCarrito() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function mostrarCarrito() {
    const contenedor = document.querySelector(".cart-items");
    const contenedorBoton = document.querySelector(".btn-container");
    contenedor.innerHTML = "";
    contenedorBoton.innerHTML = "";

    if (cart.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.textContent = "No hay elementos en el cart.";
        contenedor.appendChild(mensaje);
        return;
    }

    renderizarCarrito(contenedor);
    agregarFuncionalidadCarrito();
    agregarBotonFinalizarCompra(contenedorBoton);
}

function renderizarCarrito(contenedor) {
    cart.forEach((product, index) => {
        const divProducto = document.createElement("div");
        divProducto.classList.add("item-block");
        divProducto.innerHTML = `
                <img src="http://localhost:5000/${product.img}" class="modo-icono">
                <div class="item-info">
                    <h5>${product.name}</h5> 
                    <h6>Cantidad: ${product.count}</h6>
                    <h4>$${(product.price * product.count).toLocaleString('es-AR')}</h4>
                </div>
                <div class="count-control">
                    <button class="decrementar">-</button>
                    <span>${product.count}</span>
                    <button class="incrementar">+</button>
                </div>
                <img class="delete-button" src= "http://localhost:5000/img/icons/trash_icon.png" alt="Eliminar">
                `;
        divProducto.dataset.index = index; // Para identificar el producto luego
        contenedor.appendChild(divProducto);
    });
}

function agregarFuncionalidadCarrito() {
    document.querySelectorAll(".item-block").forEach(divProducto => {
        const index = parseInt(divProducto.dataset.index);
        const product = cart[index];

        divProducto.querySelector(".delete-button").addEventListener('click', () => eliminarDelCarrito(index));
        divProducto.querySelector(".incrementar").addEventListener('click', () => {
            product.count++;
            actualizarCarrito();
        });
        divProducto.querySelector(".decrementar").addEventListener('click', () => {
            if (product.count > 1) {
                product.count--;
            } else {
                cart.splice(index, 1);
            }
            actualizarCarrito();
        });
    });
}

function mostrarModalConfirmacion() {
    // Evita duplicados
    if (document.getElementById("modal-confirmacion")) return;

    const modalHTML = `
        <div id="modal-confirmacion" class="modal">
        <div class="modal-contenido">
            <p>¿Deseás confirmar tu compra?</p>
            <div class="modal-botones">
            <button id="btn-confirmar" class="btn-confirmar">Sí</button>
            <button id="btn-cancelar" class="btn-cancelar">No</button>
            </div>
        </div>
        </div>
    `;

    const contenedor = document.createElement("div");
    contenedor.innerHTML = modalHTML;
    document.body.appendChild(contenedor);

    // Eventos
    const modal = document.getElementById("modal-confirmacion");
    const btnConfirmar = document.getElementById("btn-confirmar");
    const btnCancelar = document.getElementById("btn-cancelar");

    btnCancelar.addEventListener("click", () => {
        modal.remove();
    });

    btnConfirmar.addEventListener("click", async () => {
        modal.remove();
        
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const nombreUsuario = localStorage.getItem("nombreUsuario") || "Cliente";
        
        const sale = {
            buyerName: nombreUsuario,
            products: cart.map(product => ({
                productId: product.id,
                count: product.count
            }))
        };
        const res = await fetch("http://localhost:5000/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sale)
        })
        if (res.ok) {
            window.location.href = "./ticket.html";
        } else {
        alert("Error al registrar la venta");
        }
    });
}


function agregarBotonFinalizarCompra(contenedorBoton) {
    const btnFinalizarCompra = document.createElement("button");
    btnFinalizarCompra.classList = "finalizar-compra";
    btnFinalizarCompra.textContent = "Finalizar Compra";
    contenedorBoton.appendChild(btnFinalizarCompra);

    btnFinalizarCompra.addEventListener("click", () => {
        mostrarModalConfirmacion();
    });
}


function eliminarDelCarrito(indice) {
    cart.splice(indice, 1);
    actualizarCarrito();
}

function actualizarCarrito() {
    actualizarTotal();
    guardarCarrito();
    mostrarCarrito();
}

function actualizarTotal() {
    let precioTotal = 0;
    cart.forEach(producto => {
        precioTotal += (producto.precio * producto.count);
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
        localStorage.removeItem("cart");
        window.location.href = "./login.html"; // Cambiar a la ruta de tu inicio
<<<<<<< Updated upstream
=======
    });

    // Cerrar la ventana si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".usuario").contains(e.target)) {
            ventana.classList.add("oculto");
        }
    });
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
        window.location.href = "./acceso.html";
>>>>>>> Stashed changes
    });

    // Cerrar la ventana si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".usuario").contains(e.target)) {
            ventana.classList.add("oculto");
        }
    });
}

function init() {
    btnLogo();
    darkMode();
    cargarCarrito();
    mostrarCarrito();
    ventanaUsuario();
}

init();