// Este se usa en páginas protegidas como el catálogo
export function protegerRuta() {
    const nombre = sessionStorage.getItem("nombreUsuario");
    if (!nombre) {
        alert("Necesitás iniciar sesión para ingresar a la tienda.");
        window.location.href = "./login.html";
    }
}

// Este se usa en el login para evitar que vuelva si ya inició sesión
export function redirigirSiYaInicioSesion() {
    const nombre = sessionStorage.getItem("nombreUsuario");
    if (nombre) {
        alert("Para volver al login es necesario cerrar sesión.");
        window.location.href = "./catalog.html";
    }
}