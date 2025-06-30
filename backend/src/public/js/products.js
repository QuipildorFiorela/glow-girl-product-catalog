function darkMode() {
    const btnMode = document.getElementById("btn-mode");
    const storeLogo = document.getElementById("logo-tienda");

    // Verificar si ya había un modo guardado
    if (localStorage.getItem("modo") === "oscuro") {
        document.body.classList.add("modo-oscuro");
        btnMode.src = "http://localhost:5000/img/icons/dark_mode_icon.png";
        storeLogo.src = "http://localhost:5000/img/icons/logo_tienda_dark_icon.png";
    }

    btnMode.addEventListener("click", () => {
        const activeMode = document.body.classList.toggle("modo-oscuro");

        // Cambiar ícono
        btnMode.src = activeMode ? "http://localhost:5000/img/icons/dark_mode_icon.png" : "http://localhost:5000/img/icons/light_mode_icon.png";
        storeLogo.src = activeMode ? "http://localhost:5000/img/icons/logo_tienda_dark_icon.png" : "http://localhost:5000/img/icons/logo_tienda_light_icon.png";

        // Guardar en localStorage
        localStorage.setItem("modo", activeMode ? "oscuro" : "claro");
    });
}

function btnChangeState() {
    const buttons = document.querySelectorAll(".btn-desactivar");

    buttons.forEach(button => {
        button.addEventListener("click", async () => {
            const id = button.dataset.id;
            // Evita duplicados
            if (document.getElementById("modal-confirmacion")) return;

            btnTextContent = button.textContent;

            const modalHTML = `
            <div id="modal-confirmacion" class="modal">
            <div class="modal-contenido">
                <p>¿Seguro que quiere ${btnTextContent} el producto?</p>
                <div class="modal-botones">
                <button id="btn-confirmar" class="btn-confirmar">Sí</button>
                <button id="btn-cancelar" class="btn-cancelar">No</button>
                </div>
            </div>
            </div>
            `;

            const container = document.createElement("div");
            container.innerHTML = modalHTML;
            document.body.appendChild(container);

            // Eventos
            const modal = document.getElementById("modal-confirmacion");
            const btnConfirm = document.getElementById("btn-confirmar");
            const btnCancel = document.getElementById("btn-cancelar");

            btnCancel.addEventListener("click", () => {
                modal.remove();
            });

            btnConfirm.addEventListener("click", async () => {
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
    });
}

/*function filter() {
    const searchBar = document.querySelector(".search-bar");
    searchBar.addEventListener("keyup", () => {
        cargarYMostrar(1); // Cada vez que escribo, vuelve a cargar desde la página 1
    });
}*/

function removeAccents(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function userWindow() {
    const userIcon = document.getElementById("icono-usuario");
    const userWindow = document.getElementById("ventana-usuario");
    const userName = document.getElementById("nombre-usuario");
    const logOutBtn = document.getElementById("cerrar-sesion");

    const savedName = JSON.parse(localStorage.getItem("usuario")) || "Invitado";
    userName.textContent = savedName;

    userIcon.addEventListener("click", () => {
        userWindow.classList.toggle("oculto");
    });

    logOutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        window.location.href = 'http://localhost:5000/api/admin/login';
    });

    // Cerrar la ventana si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".usuario").contains(e.target)) {
            userWindow.classList.add("oculto");
        }
    });
}

async function init() {
    darkMode();
    /*filter();*/
    btnChangeState();
    userWindow();
}

init();