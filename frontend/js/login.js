import {redirectIfAlreadyLogged} from "../middlewares/authClient.js"
import { darkMode } from "../js/utils.js"

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