export function darkMode() {
    const btnMode = document.getElementById("btnMode");
    const storeLogo = document.getElementById("storeLogo");

    const darkModeIcon = "http://localhost:5000/img/icons/dark_mode_icon.png";
    const lightModeIcon = "http://localhost:5000/img/icons/light_mode_icon.png";
    const logoTiendaDarkMode = "http://localhost:5000/img/icons/logo_tienda_dark_icon.png";
    const logoTiendaLightIcon = "http://localhost:5000/img/icons/logo_tienda_light_icon.png";

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
        window.location.href="./login.html";
    });

    // Cerrar la ventana si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".user").contains(e.target)) {
            userWindow.classList.add("hidden");
        }
    });
}

// Este se usa en páginas protegidas como el catálogo
export function redirectIfNotLogged() {
    const name = sessionStorage.getItem("userName");
    if (!name) {
        alert("Inicia sesión para ingresar a la tienda.");
        window.location.href = "./login.html";
    }
}

// Este se usa en el login para evitar que vuelva si ya inició sesión
export function redirectIfAlreadyLogged() {
    const name = sessionStorage.getItem("userName");
    if (name) {
        alert("Cierra sesión para volver al login.");
        window.location.href = "./catalog.html";
    }
}