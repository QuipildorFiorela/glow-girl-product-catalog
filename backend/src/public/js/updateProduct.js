import { darkMode, showUserWindow, changeStyleInputFile, validateFields, redirectIfNotLogged, showPopUp} from "./utils.js"

function uploadProduct() {
    document.getElementById("formUpdateProduct").addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!validateFields()) return; //POR SI QUIEREN QUITAR EL REQUIRED ESTÁ TMB VALIDADO ACÁ

        const idProducto = document.getElementById("id").value;
        const form = e.target;
        const data = new FormData(form)
        console.log(data);

        try {
            const response = await fetch(`/api/products/${idProducto}`, {
                method: "PUT",
                body: data,
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                return;
            };
            showPopUp("Producto creado con éxito.");
            setTimeout(() => {
            window.location.href = "/api/admin/catalog";
            }, 2000); // Le doy 1.5 segundos para mostrar el mensaje

        } catch (error) {
            console.error("Error:", error);
        }
    });
};


function btnCancel() {
    const btnReturn = document.getElementById("btnCancel");
    btnReturn.addEventListener("click", () => {
        // Evita duplicados
        if (document.getElementById("modalConfirmation")) return;

        const modalHTML = `
        <div class="modal" id="modalConfirmation">
        <div class="modal-content">
            <p>¿Seguro que quiere volver?</p>
            <div class="modal-botns">
                <button id="btnConfirmModal" class="btn-pink">Sí</button>
                <button id="btnCancelModal" class="btn-grey">No</button>
            </div>
        </div>
        </div>
        `;

        const container = document.createElement("div");
        container.innerHTML = modalHTML;
        document.body.appendChild(container);

        // Eventos
        const modal = document.getElementById("modalConfirmation");
        const btnConfirm = document.getElementById("btnConfirmModal");
        const btnCancel = document.getElementById("btnCancelModal");

        btnCancel.addEventListener("click", () => {
            modal.remove();
        });

        btnConfirm.addEventListener("click", async () => {
            window.location.href = "/api/admin/catalog"; // Ruta para volver al listado
        });
    })
}


async function init() {
    darkMode();
    redirectIfNotLogged();
    changeStyleInputFile();
    uploadProduct();
    btnCancel();
    showUserWindow();
}

init();