import { darkMode } from "./utils.js"
import { redirectIfAlreadyLogged } from "./utils.js";

function verifyPassword() {
    document.getElementById("btnEnter").addEventListener("click", async (e) => {
        e.preventDefault(); // Esto evita que la página se recargue
        const mail = document.getElementById("mail").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ mail, password })
            });
            const result = await response.json();
            if (response.ok) {
                sessionStorage.setItem("userName", result.payload);
                window.location.href = "/api/admin/catalog";
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al intentar iniciar sesión");
        }
    })
};

async function init() {
    darkMode();
    redirectIfAlreadyLogged();
    verifyPassword();
    autocompletar();
}

init();