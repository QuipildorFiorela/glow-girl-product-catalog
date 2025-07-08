import { darkMode, showUserWindow } from "./utils.js"
const fileInput = document.getElementById('fileInput');

function changeStyleInputFile() {
    const dropArea = document.getElementById('dropArea');
    ['dragenter', 'dragover'].forEach(eventName => { // dragenter: cuando el archivo entra al área, dragover: mientras está en el área
        dropArea.addEventListener(eventName, e => {
            e.preventDefault();
            dropArea.classList.add('dragover');
        });
    });
    
    ['dragleave', 'drop'].forEach(eventName => { // dragleave: cuando el archivo sale del área, drop: cuando el archivo se suelta en el área
        dropArea.addEventListener(eventName, e => {
            e.preventDefault();
            dropArea.classList.remove('dragover');
        });
    });
    
    dropArea.addEventListener('drop', e => {
        const files = e.dataTransfer.files;
        if (files.length) {
            fileInput.files = files;
        }
    });
}

function showFile(file) {
    const filePreview = document.getElementById('filePreview');
    const fileName = document.getElementById('fileName');
    filePreview.style.display = 'flex';
    fileName.textContent = `Archivo: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
}

function fileChecker() {
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        const maxSize = 5 * 1024 * 1024;
        const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

        if (file.size > maxSize) {
            alert("El archivo supera los 5MB.");
            fileInput.value = ""; // Limpiar
            return;
        }
        if (!validExtensions.includes(file.type)) {
            alert("Tipo de archivo no permitido. Solo jpeg, jpg, png, webp.");
            fileInput.value = "";
            return;
        }
        showFile(file);
    });
}

function priceChecker(){
    const price = document.getElementById("price").value
    if(price < 1){
        alert("El precio debe ser mayor a 0");
        return false
    }
    return true;
}

function sendForm() {
    document.getElementById("form-create-product").addEventListener("submit", async (e) => {
        e.preventDefault();
        if(!priceChecker()) return;

        const form = e.target;
        const data = new FormData(form);

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                body: data,
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                return;
            }
            window.location.href = "/api/admin/products";
        } catch (error) {
            console.error("Error:", error.message);
        }
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

function init() {
    darkMode();
    changeStyleInputFile();
    fileChecker();
    sendForm();
    btnCancel();
    showUserWindow();
}

init();
