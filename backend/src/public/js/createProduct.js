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

function returnToProducts() {
    const btnReturn = document.querySelector(".btnVolver");
    btnReturn.addEventListener("click", () => {
        // Evita duplicados
        if (document.getElementById("modal-confirmacion")) return;

        const modalHTML = `
        <div id="modal-confirmacion" class="modal">
        <div class="modal-contenido">
            <p>¿Seguro que quiere volver?</p>
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
            window.location.href = "/api/admin/products"; // Ruta para volver al listado
        });
    })
}

function showUserWindow() {
    const userIcon = document.getElementById("icono-usuario");
    const userWindow = document.getElementById("ventana-usuario");
    const userName = document.getElementById("nombre-usuario");
    const logOutBtn = document.getElementById("cerrar-sesion");

    const savedName = localStorage.getItem("nombreUsuario") || "Invitado";
    userName.textContent = savedName;

    userIcon.addEventListener("click", () => {
        userWindow.classList.toggle("oculto");
    });

    logOutBtn.addEventListener("click", () => {
        window.location.href = 'http://localhost:5000/api/admin/login';
    });

    // Cerrar la ventana si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".usuario").contains(e.target)) {
            userWindow.classList.add("oculto");
        }
    });
}

function init() {
    darkMode();
    returnToProducts();
    showUserWindow();
}

init();
