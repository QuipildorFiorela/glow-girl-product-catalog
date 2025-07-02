import {redirectIfAlreadyLogged} from "../middlewares/authClient.js"

// Modo oscuro
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


function funcionalidadBtnIngresar(){
    document.addEventListener("DOMContentLoaded", () => {
    const btnIngresar = document.getElementById("btn-ingresar");
    const inputNombre = document.getElementById("nombre");

    btnIngresar.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();

        if (nombre) {
        //guardamos el nombre para usarlo en otra página
        sessionStorage.setItem("nombreUsuario", nombre);
        //redirigimos a la página principal
        window.location.href = "catalog.html";
        } else {
        alert("Por favor ingresá tu nombre.");
        }
    });
    });
}

async function init() {
    redirectIfAlreadyLogged();
    darkMode();
    funcionalidadBtnIngresar();
}

init();