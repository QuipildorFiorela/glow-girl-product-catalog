// Este se usa en páginas protegidas como el catálogo
export function protectRoute() {
    const name = sessionStorage.getItem("userName");
    if (!name) {
        alert("Necesitás iniciar sesión para ingresar a la tienda.");
        window.location.href = "./login.html";
    }
}

// Este se usa en el login para evitar que vuelva si ya inició sesión
export function redirectIfAlreadyLogged() {
    const name = sessionStorage.getItem("userName");
    if (name) {
        alert("Para volver al login es necesario cerrar sesión.");
        window.location.href = "./catalog.html";
    }
}