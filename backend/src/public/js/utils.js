export function darkMode() {
    const btnMode = document.getElementById("btnMode");
    const storeLogo = document.getElementById("storeLogo");

    const darkModeIcon = "/img/icons/dark_mode_icon.png";
    const lightModeIcon = "/img/icons/light_mode_icon.png";
    const logoTiendaDarkMode = "/img/icons/logo_tienda_dark_icon.png";
    const logoTiendaLightIcon = "/img/icons/logo_tienda_light_icon.png";

    // Verificar si ya había un modo guardado
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark-mode");
        btnMode.src = darkModeIcon;
        storeLogo.src = logoTiendaDarkMode;
    }

    btnMode.addEventListener("click", () => {
        const activeMode = document.body.classList.toggle("dark-mode");

        // Cambiar ícono
        btnMode.src = activeMode ? darkModeIcon : lightModeIcon;
        storeLogo.src = activeMode ? logoTiendaDarkMode : logoTiendaLightIcon;

        // Guardar en sessionStorage
        localStorage.setItem("mode", activeMode ? "dark" : "light");
    });
}


export function showUserWindow() {
    const userIcon = document.getElementById("userIcon");
    const userWindow = document.getElementById("userWindow");
    const userName = document.getElementById("userName");
    const logOutBtn = document.getElementById("logOut");

    const savedName = sessionStorage.getItem("userName");
    userName.textContent = savedName;

    userIcon.addEventListener("click", () => {
        userWindow.classList.toggle("hidden");
    });

    logOutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("actualPage");
        window.location.href='/api/admin/login';
    });

    // Cerrar la ventana si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".user").contains(e.target)) {
            userWindow.classList.add("hidden");
        }
    });
}

export function changeStyleInputFile() {
    const fileInput = document.getElementById('fileInput');
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
            showFile(files[0]);
        }
    });
}

export function showFile(file) {
    const filePreview = document.getElementById('filePreview');
    const fileName = document.getElementById('fileName');
    filePreview.style.display = 'flex';
    fileName.textContent = `Archivo: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
}

export function fileAlerter() {
    const fileInput = document.getElementById('fileInput');
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

export function validateFields() {
    const name = document.getElementById("name").value.trim();
    const description = document.getElementById("description").value.trim();
    const price = document.getElementById("price").value

    let message = "";

    if (name === "") {
        message += "El nombre no puede estar vacío.\n";
    }
    if (description === "") {
        message += "La descripción no puede estar vacía.\n";
    }
    if(price < 1){
        message += "El precio debe ser mayor a 0.\n";
    }
    if (message) {
        alert(message);
        return false;
    }
    return true;
}

export function redirectIfNotLogged() {
    const name = sessionStorage.getItem("userName");
    if (!name) {
        alert("Inicia sesión para ingresar a la tienda.");
        window.location.href = "/api/admin/login"; 
    } 
}

export function redirectIfAlreadyLogged() {
    const name = sessionStorage.getItem("userName");
    if (name) {
        alert("Cierra sesión para volver al login.");
        window.location.href = "/api/admin/catalog";
    }
}