import { darkMode, showUserWindow } from "./utils.js"

function btnChangeState() {
    const buttons = document.querySelectorAll(".btn-deactivate");

    buttons.forEach(button => {
        button.addEventListener("click", async () => {
            const id = button.dataset.id;
            // Evita duplicados

            // separar el modal en otra funcion
            if (document.getElementById("modal-confirmation")) return;

            const btnTextContent = button.textContent;

            const modalHTML = `
            <div id="modal-confirmation" class="modal">
            <div class="modal-content">
                <p>¿Seguro que quiere ${btnTextContent} el producto?</p>
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

async function init() {
    darkMode();
    /*filter();*/
    btnChangeState();
    showUserWindow();
}

init();