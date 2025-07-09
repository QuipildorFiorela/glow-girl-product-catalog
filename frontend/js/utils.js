export function darkMode() {
    const btnMode = document.getElementById("btnMode");
    const storeLogo = document.getElementById("storeLogo");

    // Verificar si ya había un modo guardado
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark-mode");
        btnMode.src = "http://localhost:5000/img/icons/dark_mode_icon.png";
        storeLogo.src = "http://localhost:5000/img/icons/logo_tienda_dark_icon.png";
    }

    btnMode.addEventListener("click", () => {
        const activeMode = document.body.classList.toggle("dark-mode");

        // Cambiar ícono
        btnMode.src = activeMode ? "http://localhost:5000/img/icons/dark_mode_icon.png" : "http://localhost:5000/img/icons/light_mode_icon.png";
        storeLogo.src = activeMode ? "http://localhost:5000/img/icons/logo_tienda_dark_icon.png" : "http://localhost:5000/img/icons/logo_tienda_light_icon.png";

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
        window.location.href="./login.html";
    });

    // Cerrar la ventana si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".user").contains(e.target)) {
            userWindow.classList.add("hidden");
        }
    });
}

export function btnLogo(){
    const btnBackToCatalog = document.getElementById("storeLogo");
    btnBackToCatalog.addEventListener("click", () => {
        window.location.href = "./catalog.html"
    })
}