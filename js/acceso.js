
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

function funcionalidadBtnIngresar(){
    document.addEventListener("DOMContentLoaded", () => {
    const btnIngresar = document.getElementById("btn-ingresar");
    const inputNombre = document.getElementById("nombre");

    btnIngresar.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();

        if (nombre) {
        //guardamos el nombre para usarlo en otra página
        localStorage.setItem("nombreUsuario", nombre);
        //redirigimos a la página principal
        window.location.href = "inicio.html";
        } else {
        alert("Por favor ingresá tu nombre.");
        }
    });
    });
}

async function init() {
    darkMode();
    funcionalidadBtnIngresar();
}

init();