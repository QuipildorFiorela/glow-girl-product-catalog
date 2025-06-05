
function funcionalidadBtnIngresar(){
    document.addEventListener("DOMContentLoaded", () => {
    const btnIngresar = document.getElementById("btn-ingresar");
    const inputNombre = document.getElementById("nombre");

    btnIngresar.addEventListener("click", () => {
        const nombre = inputNombre.value.trim();

        if (nombre) {
        // Guardamos el nombre si querés usarlo en otra página
        localStorage.setItem("nombreUsuario", nombre);
        // Redirigimos a la página principal
        window.location.href = "inicio.html";
        } else {
        alert("Por favor ingresá tu nombre.");
        }
    });
    });
}

async function init() {
    funcionalidadBtnIngresar();
}

init();