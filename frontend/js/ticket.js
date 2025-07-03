import {protectRoute} from "../middlewares/authClient.js"
import { darkMode} from "../js/utils.js"
const nombreUsuario = getUserName();
const cart = getCart();

function getUserName() {
    return sessionStorage.getItem("nombreUsuario");
}

function getCart() {
    return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function generarID() {
    return Math.floor(100000000 + Math.random() * 900000000);
}

function getDate() {
    const hoy = new Date();
    return hoy.toLocaleDateString('es-AR');
}

function renderizarProductos(cart) {
    const tabla = document.getElementById("tabla-productos");
    let total = 0;
    cart.forEach(product => {
        const subtotal = product.price * product.count;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${product.name} x${product.count}</td>
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
    document.getElementById("fecha-pedido").textContent = getDate();
}

function imprimirTicket() {
    window.print();
}

function salirDelTicket() {
    sessionStorage.removeItem("nombreUsuario");
    sessionStorage.removeItem("cart");
    sessionStorage.removeItem("actualPage");
    window.location.href = "./login.html";
}

function asignarEventos() {
    const btnImprimir = document.getElementById("btn-descargar");
    const btnSalir = document.getElementById("btn-salir");

    if (btnImprimir) btnImprimir.addEventListener("click", imprimirTicket);
    if (btnSalir) btnSalir.addEventListener("click", salirDelTicket);
}

function init() {
    protectRoute();
    darkMode();
    renderizarProductos(cart);
    mostrarDatosGenerales(nombreUsuario);
    asignarEventos();
}

init();