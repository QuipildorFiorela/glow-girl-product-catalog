export function darkMode() {
    const btnMode = document.getElementById("btn-mode");
    const logoTienda = document.getElementById("logo-tienda");

    // Verificar si ya había un modo guardado
    if (localStorage.getItem("modo") === "oscuro") {
        document.body.classList.add("modo-oscuro");
        btnMode.src = "http://localhost:5000/img/icons/dark_mode_icon.png";
        logoTienda.src = "http://localhost:5000/img/icons/logo_tienda_dark_icon.png";
    }

    btnMode.addEventListener("click", () => {
        const modoActivo = document.body.classList.toggle("modo-oscuro");

        // Cambiar ícono
        btnMode.src = modoActivo ? "http://localhost:5000/img/icons/dark_mode_icon.png" : "http://localhost:5000/img/icons/light_mode_icon.png";
        logoTienda.src = modoActivo ? "http://localhost:5000/img/icons/logo_tienda_dark_icon.png" : "http://localhost:5000/img/icons/logo_tienda_light_icon.png";

        // Guardar en sessionStorage
        localStorage.setItem("modo", modoActivo ? "oscuro" : "claro");
    });
}

export function showUserWindow() {
    const userIcon = document.getElementById("icono-usuario");
    const userWindow = document.getElementById("ventana-usuario");
    const userName = document.getElementById("nombre-usuario");
    const logOutBtn = document.getElementById("cerrar-sesion");

    const savedName = sessionStorage.getItem("nombreUsuario");
    userName.textContent = savedName;

    userIcon.addEventListener("click", () => {
        userWindow.classList.toggle("oculto");
    });

    logOutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("nombreUsuario");
        sessionStorage.removeItem("cart");
        sessionStorage.removeItem("actualPage");
        window.location.href = "./login.html";
    });

    // Cerrar la ventana si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".usuario").contains(e.target)) {
            userWindow.classList.add("oculto");
        }
    });
}

export function btnLogo(){
    const btnBackToCatalog = document.getElementById("logo-tienda");
    btnBackToCatalog.addEventListener("click", () => {
        window.location.href = "./catalog.html"
    })
}