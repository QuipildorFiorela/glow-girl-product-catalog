async function renderTicketFromDB() {
    const saleId = new URLSearchParams(window.location.search).get("saleId");
    if (!saleId) {
        alert("Venta no encontrada");
        return window.location.href = "/login.html";
    }

    const response = await fetch((`http://localhost:5000/api/sales/${saleId}`));
    if (!response.ok) {
        alert("Esta venta no existe");
        return window.location.href = "/login.html";
    }

    const { payload } = await response.json();

    document.getElementById("id-sale").textContent = `Factura N° ${saleId}`;
    document.getElementById("user-name").textContent = payload.buyerName;
    document.getElementById("billed-to").textContent = payload.buyerName;
    document.getElementById("order-date").textContent = new Date(payload.date).toLocaleDateString("es-AR");

    const table = document.getElementById("products-table");
    let total = 0;

    payload.products.forEach(product => {
        const { name, count, subtotal } = product;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${name} x${count}</td>
            <td class="text-end">$${subtotal.toLocaleString("es-AR")}</td>
        `;
        table.appendChild(fila);
    });

    document.getElementById("total-final").textContent = `$${total.toLocaleString("es-AR")}`;
}

function printTicket() {
    window.print();
}

function getOutOfTicket() {
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("cart");
    sessionStorage.removeItem("actualPage");
    window.location.href = "./login.html";
}

function assignEvents() {
    const btnPrint = document.getElementById("btn-download");
    const btnLogOut = document.getElementById("btn-logOut");

    if (btnPrint) btnPrint.addEventListener("click", printTicket);
    if (btnLogOut) btnLogOut.addEventListener("click", getOutOfTicket);
}

function init() {
    renderTicketFromDB();
    assignEvents();
}

init();