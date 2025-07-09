import { redirectIfAlreadyLogged } from "../middlewares/authClient.js"
import { darkMode } from "../js/utils.js"

function btnEnter() {
    document.addEventListener("DOMContentLoaded", () => {
        const btnEnter = document.getElementById("btnEnter");
        const inputName = document.getElementById("name");

        btnEnter.addEventListener("click", () => {
            const name = inputName.value.trim();

            if (name) {
                //guardamos el nombre para usarlo en otra página
                sessionStorage.setItem("userName", name);
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
    btnEnter();
}

init();