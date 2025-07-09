import { darkMode, showUserWindow } from "./utils.js"

function showDetails() {
    const detailsBtns = document.querySelectorAll('.btn-pink');

    detailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const detailsRow = document.getElementById(`details-${id}`);

            const isVisible = detailsRow.style.display === 'table-row';

            detailsRow.style.display = isVisible ? 'none' : 'table-row';
            btn.textContent = isVisible ? 'Mostrar detalles' : 'Ocultar detalles';
        });
    });
}

function init() {
    darkMode();
    showUserWindow();
    showDetails();
}

init();