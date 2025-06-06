let cardsPerLoad = 3; // Cuántas tarjetas cargar por cada clic en "Ver más"
let visibleCards = 3; // Número de tarjetas visibles actualmente (inicia con 3)
let filteredCards = []; // Tarjetas que están filtradas

// Función que se ejecuta cuando la página se carga
document.addEventListener("DOMContentLoaded", function () {
  filterCards("all"); // Filtrar inicialmente por 'todos' y mostrar las primeras 3
  showCards(visibleCards); // Mostrar las primeras 3 tarjetas
});

// Mostrar las tarjetas según el filtro
function showCards(num) {
  const cards = filteredCards; // Solo trabajamos con las tarjetas filtradas
  cards.forEach((card, index) => {
    if (index < num) {
      card.style.display = "block"; // Mostrar hasta el número de tarjetas visibles
    } else {
      card.style.display = "none"; // Ocultar las demás
    }
  });

  // Mostrar u ocultar el enlace "Ver más" y "Ver menos"
  const seeMoreLink = document.getElementById("ver-mas");
  const seeLessLink = document.getElementById("ver-menos");

  if (filteredCards.length > visibleCards) {
    seeMoreLink.style.display = "block"; // Mostrar el enlace si hay más tarjetas
    seeLessLink.style.display = "none"; // Ocultar el enlace de "Ver menos"
  } else if (filteredCards.length <= visibleCards && visibleCards > 3) {
    seeMoreLink.style.display = "none"; // Ocultar "Ver más" si no hay más tarjetas
    seeLessLink.style.display = "block"; // Mostrar "Ver menos"
  } else {
    seeMoreLink.style.display = "none"; // Ocultar el enlace de "Ver más" cuando no haya más tarjetas
    seeLessLink.style.display = "none"; // No mostrar "Ver menos" si ya hay 3 tarjetas visibles
  }
}

// Función para cargar más o ver menos
function toggleCards(event) {
  event.preventDefault(); // Evita el comportamiento predeterminado del enlace

  const seeMoreLink = document.getElementById("ver-mas");
  const seeLessLink = document.getElementById("ver-menos");

  if (event.target.id === "ver-mas") {
    visibleCards += cardsPerLoad; // Aumentar el número de tarjetas visibles
    showCards(visibleCards); // Mostrar las tarjetas
  } else if (event.target.id === "ver-menos") {
    visibleCards = 3; // Restablecer a 3 tarjetas visibles
    showCards(visibleCards); // Mostrar las primeras 3 tarjetas
  }
}

// Filtrar las tarjetas según el filtro seleccionado
function filterCards(filterValue) {
  const cards = document.querySelectorAll("#linkHoteleria .card");
  const buttons = document.querySelectorAll(".filter-buttons button");

  // Restablecer el número de tarjetas visibles y las tarjetas filtradas
  visibleCards = cardsPerLoad; // Restablecer a 3
  filteredCards = [];

  // Si el filtro es "all", se muestran todas las tarjetas
  if (filterValue === "all") {
    cards.forEach((card) => {
      filteredCards.push(card); // Agregar todas las tarjetas a filteredCards
      card.style.display = "block"; // Asegurarse de que todas se muestren cuando se selecciona "all"
    });
  } else {
    // Si no es "all", se filtra por categoría
    cards.forEach((card) => {
      card.style.display = "none"; // Ocultar todas las tarjetas inicialmente
      if (card.getAttribute("data-category") === filterValue) {
        filteredCards.push(card); // Solo agregar las que coinciden con el filtro
        card.style.display = "block"; // Asegurarse de que se muestren las tarjetas filtradas
      }
    });
  }

  // Mostrar las primeras 3 tarjetas del conjunto filtrado
  showCards(visibleCards);

  // Actualizar el estado de los botones de filtro
  buttons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-filter") === filterValue) {
      btn.classList.add("active");
    }
  });
}
