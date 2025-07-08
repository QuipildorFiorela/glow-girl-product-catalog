import { darkMode, showUserWindow } from "./utils.js"

const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
//const uploadForm = document.getElementById('uploadForm');
const filePreview = document.getElementById('filePreview');
const fileName = document.getElementById('fileName');
const progressFill = document.getElementById('progressFill');

function uploadFile(){
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            showFile(fileInput.files[0]);
        }
    });
    
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
            showFile(files[0]);
        }
    });
}

function showFile(file) {
    filePreview.style.display = 'flex';
    fileName.textContent = `Archivo: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
}

function sendForm(){
    document.getElementById("form-create-product").addEventListener("submit", async (e) => {
        e.preventDefault();
    
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
            console.log(error);
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
    uploadFile();
    sendForm();
    btnCancel();
    showUserWindow();
}

init();
