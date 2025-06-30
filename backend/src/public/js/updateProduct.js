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

function uploadProduct() {
    document.getElementById("form-editar-producto").addEventListener("submit", async (e) => {
        e.preventDefault();

        const idProducto = document.getElementById("product-id").value;

        const formData = {
            name: document.getElementById("name").value,
            description: document.getElementById("description").value,
            price: document.getElementById("price").value,
            img: document.getElementById("img").value,
            category: document.getElementById("category").value,
            active: true
        };
        // Evita duplicados
        if (document.getElementById("modal-confirmacion")) return;

        const modalHTML = `
        <div id="modal-confirmacion" class="modal">
        <div class="modal-contenido">
            <p>¿Seguro que quiere actualizar el producto?</p>
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
                const response = await fetch(`/api/products/${idProducto}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
                if (!response.ok) throw new Error("Error al actualizar");
                // Redirigir a la vista de admin o mostrar mensaje
                window.location.href = "/api/admin/products";
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un problema al actualizar el producto");
            }
        });
    });
}

function btnCancel() {
    const btnReturn = document.querySelector(".btnCancel");
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

function userWindow() {
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
        localStorage.removeItem("nombreUsuario");
        localStorage.removeItem("carrito");
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
    uploadProduct();
    btnCancel();
    userWindow();
}

init();