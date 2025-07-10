import { protectRoute } from "../middlewares/authClient.js"
import { darkMode, showUserWindow } from "../js/utils.js"
let cart = [];

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
        message.textContent = "No hay elementos en el carrito.";
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
                <img src="http://localhost:5000/img/products/${product.img}" class="icon-mode">
                <div class="item-info">
                    <h5>${product.name}</h5> 
                    <h6>Cantidad: ${product.count}</h6>
                    <h4>$${(product.price * product.count).toLocaleString('es-AR')}</h4>
                </div>
                <div class="amount-control">
                    <button class="decrease">-</button>
                    <span>${product.count}</span>
                    <button class="increase">+</button>
                </div>
                <img class="btn-delete" src= "http://localhost:5000/img/icons/trash_icon.png" alt=Delete">
                `;
        divProduct.dataset.index = index; // Para identificar el producto luego
        container.appendChild(divProduct);
    });
}

function addCartFunctionality() {
    document.querySelectorAll(".item-block").forEach(divProduct => {
        const index = parseInt(divProduct.dataset.index);
        const product = cart[index];

        divProduct.querySelector(".btn-delete").addEventListener('click', () => deleteFromCart(index));
        divProduct.querySelector(".increase").addEventListener('click', () => {
            product.count++;
            updateCart();
        });
        divProduct.querySelector(".decrease").addEventListener('click', () => {
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
    if (document.getElementById("confirmationModal")) return;
    const modalHTML = `
        <div id="confirmationModal" class="modal">
        <div class="modal-content">
            <p>¿Deseás confirmar tu compra?</p>
            <div class="modal-btns">
            <button id="btnConfirmModal" class="btn-confirm">Sí</button>
            <button id="btnCancelModal" class="btn-cancel">No</button>
            </div>
        </div>
        </div>
    `;
    const container = document.createElement("div");
    container.innerHTML = modalHTML;
    document.body.appendChild(container);

    // Eventos
    const modal = document.getElementById("confirmationModal");
    const btnConfirm = document.getElementById("btnConfirmModal");
    const btnCancel = document.getElementById("btnCancelModal");

    btnCancel.addEventListener("click", () => {
        modal.remove();
    });

    btnConfirm.addEventListener("click", async () => {
        modal.remove();
        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        const userName = sessionStorage.getItem("userName");
        const sale = {
            buyerName: userName,
            products: cart.map(product => ({
                productId: product.id,
                count: product.count
            }))
        };
        const res = await fetch("http://localhost:5000/api/admin/sales", { //REFACTORIZAR
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
    btnFinalizarCompra.classList = "complete-buy";
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
    document.getElementById("totalPrice").textContent = `$${totalPrice.toLocaleString('es-AR')}`;
}

function init() {
    protectRoute();
    darkMode();
    loadCart();
    showCart();
    showUserWindow();
}

init();