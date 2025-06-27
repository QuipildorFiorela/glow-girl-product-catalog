function darkMode() {
    const btnMode = document.getElementById("btn-mode");
    const logoTienda = document.getElementById("logo-tienda");

    // Verificar si ya había un modo guardado
    if (localStorage.getItem("modo") === "oscuro") {
        document.body.classList.add("modo-oscuro");
        btnMode.src = "./img/icons/dark_mode_icon.png";
        logoTienda.src = "./img/icons/logo_tienda_dark_icon.png";
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

function obtenerNombreUsuario() {
    return localStorage.getItem("nombreUsuario") || "Usuario";
}

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function generarID() {
    return Math.floor(100000000 + Math.random() * 900000000);
}

function obtenerFecha() {
    const hoy = new Date();
    return hoy.toLocaleDateString('es-AR');
}

function renderizarProductos(carrito) {
    const tabla = document.getElementById("tabla-productos");
    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${producto.nombre} x${producto.cantidad}</td>
        <td class="text-end">$${subtotal.toLocaleString('es-AR')}</td>
        `;
        tabla.appendChild(fila);
    });

    document.getElementById("total-final").textContent = `$${total.toLocaleString('es-AR')}`;
}

function mostrarDatosGenerales(nombreUsuario) {
    document.getElementById("nombre-usuario").textContent = nombreUsuario;
    document.getElementById("facturado-a").textContent = nombreUsuario;
    document.getElementById("id-compra").textContent = generarID();
    document.getElementById("id-pedido").textContent = generarID();
    document.getElementById("fecha-pedido").textContent = obtenerFecha();
}

function imprimirTicket() {
    window.print();
}

function salirDelTicket() {
    localStorage.clear();
    window.location.href = "./login.html";
}

function asignarEventos() {
    const btnImprimir = document.getElementById("btn-descargar");
    const btnSalir = document.getElementById("btn-salir");

    if (btnImprimir) btnImprimir.addEventListener("click", imprimirTicket);
    if (btnSalir) btnSalir.addEventListener("click", salirDelTicket);
}


function init() {
    const nombreUsuario = obtenerNombreUsuario();
    const carrito = obtenerCarrito();

    mostrarDatosGenerales(nombreUsuario);
    renderizarProductos(carrito);
    asignarEventos();
}

document.addEventListener("DOMContentLoaded", init);