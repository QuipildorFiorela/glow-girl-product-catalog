import { darkMode, showUserWindow } from "./utils.js"

function uploadProduct() {
    document.getElementById("form-update-product").addEventListener("submit", async (e) => {
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
        if (document.getElementById("modal-confirmation")) return;

        const modalHTML = `
        <div id="modal-confirmation" class="modal">
        <div class="modal-content">
            <p>¿Seguro que quiere actualizar el producto?</p>
            <div class="modal-btns">
            <button id="btn-confirm" class="btn-confirm">Sí</button>
            <button id="btn-cancel" class="btn-cancel">No</button>
            </div>
        </div>
        </div>
        `;

        const container = document.createElement("div");
        container.innerHTML = modalHTML;
        document.body.appendChild(container);

        // Eventos
        const modal = document.getElementById("modal-confirmation");
        const btnConfirm = document.getElementById("btn-confirm");
        const btnCancel = document.getElementById("btn-cancel");

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
        if (document.getElementById("modal-confirmation")) return;

        const modalHTML = `
        <div id="modal-confirmation" class="modal">
        <div class="modal-content">
            <p>¿Seguro que quiere salir?</p>
            <div class="modal-btns">
            <button id="btn-confirm" class="btn-confirm">Sí</button>
            <button id="btn-cancel" class="btn-cancel">No</button>
            </div>
        </div>
        </div>
        `;

        const container = document.createElement("div");
        container.innerHTML = modalHTML;
        document.body.appendChild(container);

        // Eventos
        const modal = document.getElementById("modal-confirmation");
        const btnConfirm = document.getElementById("btn-confirm");
        const btnCancel = document.getElementById("btn-cancel");

        btnCancel.addEventListener("click", () => {
            modal.remove();
        });

        btnConfirm.addEventListener("click", async () => {
            window.location.href = "/api/admin/products"; // Ruta para volver al listado
        });
    })
}


async function init() {
    darkMode();
    uploadProduct();
    btnCancel();
    showUserWindow();
}

init();