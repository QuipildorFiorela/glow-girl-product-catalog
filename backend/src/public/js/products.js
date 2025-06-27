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

function activarBotonesCambioEstado() {
    const botones = document.querySelectorAll(".btn-desactivar");

    botones.forEach(boton => {
        boton.addEventListener("click", async () => {
            const id = boton.dataset.id;

            try {
                const response = await fetch(`/api/products/changeStatus/${id}`, {
                    method: "PUT"
                });

                if (!response.ok) {
                    throw new Error("Error en la solicitud");
                }

                const data = await response.json();
                console.log(data.message);
                location.reload(); // recargar para ver el cambio reflejado

            } catch (error) {
                console.error("Error al cambiar el estado:", error);
                alert("No se pudo cambiar el estado del producto.");
            }
        });
    });
}


function filtro() {
    const searchBar = document.querySelector(".search-bar");
    searchBar.addEventListener("keyup", () => {
        const texto = quitarTildes(searchBar.value.toLowerCase());
        const cards = document.querySelectorAll(".product-card");

        cards.forEach(card => {
            const nombre = quitarTildes(card.querySelector("h3").textContent.toLowerCase());
            if (nombre.includes(texto)) {
                card.style.display = ""; // Muestra ese elemento con su display original si estaba oculto.
            } else {
                card.style.display = "none"; // Oculta ese elemento completamente.
            }
        });
    });
}

function quitarTildes(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
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
        window.location.href = 'http://localhost:5000/api/admin/login';
    });

    // Cerrar la ventana si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".usuario").contains(e.target)) {
            ventana.classList.add("oculto");
        }
    });
}

async function init() {
    darkMode();
    filtro();
    activarBotonesCambioEstado();
    ventanaUsuario();
}

init();