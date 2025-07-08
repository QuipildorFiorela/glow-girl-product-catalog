function setupSalesDetailsToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-details');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.dataset.index;
            const detailsRow = document.getElementById(`details-${index}`);

            const isVisible = detailsRow.style.display === 'table-row';

            detailsRow.style.display = isVisible ? 'none' : 'table-row';
            button.textContent = isVisible ? 'Mostrar detalles' : 'Ocultar detalles';
        });
    });
}

function toggleDetails(id) {
    const row = document.getElementById(`details-${id}`);
    row.classList.toggle("hidden");
}