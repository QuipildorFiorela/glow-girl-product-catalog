import {protectRoute} from "../middlewares/authClient.js"

let cart = [];

function btnLogo(){
    const btnBackToCatalog = document.getElementById("logo-tienda");
    btnBackToCatalog.addEventListener("click", () => {
        window.location.href = "./catalog.html"
    })
}

function darkMode() {
    const btnMode = document.getElementById("btn-mode");
    const storeLogo = document.getElementById("logo-tienda");

    // Verificar si ya había un modo guardado
    if (localStorage.getItem("modo") === "oscuro") {
        document.body.classList.add("modo-oscuro");
        btnMode.src = "http://localhost:5000/img/icons/dark_mode_icon.png";
        storeLogo.src= "http://localhost:5000/img/icons/logo_tienda_dark_icon.png";
    }

    btnMode.addEventListener("click", () => {
        const activeMode = document.body.classList.toggle("modo-oscuro");
        
        // Cambiar ícono
        btnMode.src = activeMode ? "http://localhost:5000/img/icons/dark_mode_icon.png" : "http://localhost:5000/img/icons/light_mode_icon.png";
        storeLogo.src = activeMode ? "http://localhost:5000/img/icons/logo_tienda_dark_icon.png" : "http://localhost:5000/img/icons/logo_tienda_light_icon.png";

        // Guardar en sessionStorage
        localStorage.setItem("modo", activeMode ? "oscuro" : "claro");
    });
}


function loadCart() {
    const cartSaved = sessionStorage.getItem("cart");
    if (cartSaved) {
        cart = JSON.parse(cartSaved);
        updateTotal();
    }
}

function saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(cart));
}

function showCart() {
    const container = document.querySelector(".cart-items");
    const btnContainer = document.querySelector(".btn-container");
    container.innerHTML = "";
    btnContainer.innerHTML = "";

    if (cart.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No hay elementos en el cart.";
        container.appendChild(message);
        return;
    }

    renderCart(container);
    addCartFunctionality();
    addBtnFinishBuying(btnContainer);
}

function renderCart(container) {
    cart.forEach((product, index) => {
        const divProduct = document.createElement("div");
        divProduct.classList.add("item-block");
        divProduct.innerHTML = `
                <img src="http://localhost:5000/${product.img}" class="modo-icono">
                <div class="item-info">
                    <h5>${product.name}</h5> 
                    <h6>Cantidad: ${product.count}</h6>
                    <h4>$${(product.price * product.count).toLocaleString('es-AR')}</h4>
                </div>
                <div class="cantidad-control">
                    <button class="decrementar">-</button>
                    <span>${product.count}</span>
                    <button class="incrementar">+</button>
                </div>
                <img class="delete-button" src= "http://localhost:5000/img/icons/trash_icon.png" alt="Eliminar">
                `;
        divProduct.dataset.index = index; // Para identificar el producto luego
        container.appendChild(divProduct);
    });
}

function addCartFunctionality() {
    document.querySelectorAll(".item-block").forEach(divProduct => {
        const index = parseInt(divProduct.dataset.index);
        const product = cart[index];

        divProduct.querySelector(".delete-button").addEventListener('click', () => deleteFromCart(index));
        divProduct.querySelector(".incrementar").addEventListener('click', () => {
            product.count++;
            updateCart();
        });
        divProduct.querySelector(".decrementar").addEventListener('click', () => {
            if (product.count > 1) {
                product.count--;
            } else {
                cart.splice(index, 1);
            }
            updateCart();
        });
    });
}

function confirmationModal() {
    // Evita duplicados
    if (document.getElementById("modal-confirmacion")) return;

    const modalHTML = `
        <div id="modal-confirmacion" class="modal">
        <div class="modal-contenido">
            <p>¿Deseás confirmar tu compra?</p>
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
        modal.remove();
        
        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        const userName = sessionStorage.getItem("nombreUsuario");
        
        const sale = {
            buyerName: userName,
            products: cart.map(product => ({
                productId: product.id,
                count: product.count
            }))
        };
        const res = await fetch("http://localhost:5000/api/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sale)
        })
        if (res.ok) {
            window.location.href = "./ticket.html";
        } else {
        alert("Error al registrar la venta");
        }
    });
}

function addBtnFinishBuying(contenedorBoton) {
    const btnFinalizarCompra = document.createElement("button");
    btnFinalizarCompra.classList = "finalizar-compra";
    btnFinalizarCompra.textContent = "Finalizar Compra";
    contenedorBoton.appendChild(btnFinalizarCompra);

    btnFinalizarCompra.addEventListener("click", () => {
        confirmationModal();
    });
}

function deleteFromCart(indice) {
    cart.splice(indice, 1);
    updateCart();
}

function updateCart() {
    updateTotal();
    saveCart();
    showCart();
}

function updateTotal() {
    let totalPrice = 0;
    cart.forEach(product => {
        totalPrice += (product.price * product.count);
    });
    document.getElementById("subtotal-precio").textContent = `$${totalPrice.toLocaleString('es-AR')}`;
}

function showUserWindow() {
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
        window.location.href = 'http://localhost:5000/api/admin/login';
    });

    // Cerrar la ventana si se hace clic fuera
    document.addEventListener("click", (e) => {
        if (!document.querySelector(".usuario").contains(e.target)) {
            userWindow.classList.add("oculto");
        }
    });
}

function init() {
    protectRoute();
    btnLogo();
    darkMode();
    loadCart();
    showCart();
    showUserWindow();
}

init();