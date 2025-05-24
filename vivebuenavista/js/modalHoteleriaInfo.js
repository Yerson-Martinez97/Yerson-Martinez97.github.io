function filterCards() {
    var filterValue = document.getElementById('filterSelect').value;
    var cards = document.querySelectorAll('.card');

    cards.forEach(function(card) {
        // Si se selecciona "todos", mostramos todas las cards
        if (filterValue === 'all') {
            card.classList.remove('hidden');
        } else {
            // Si la card tiene la categoría seleccionada, la mostramos
            if (card.getAttribute('data-category') === filterValue) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });
}
