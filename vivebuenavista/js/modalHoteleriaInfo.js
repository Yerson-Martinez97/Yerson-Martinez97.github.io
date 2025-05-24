function filterCards(filterValue) {
  const cards = document.querySelectorAll(".card");
  const buttons = document.querySelectorAll(".filter-buttons button");

  // Oculta primero los que no aplican
  cards.forEach((card) => {
    if (
      filterValue !== "all" &&
      card.getAttribute("data-category") !== filterValue
    ) {
      card.style.opacity = "0";
    }
  });

  // Después de la transición, oculta los no relevantes y muestra los que sí
  setTimeout(() => {
    cards.forEach((card) => {
      const match =
        filterValue === "all" ||
        card.getAttribute("data-category") === filterValue;

      if (match) {
        card.classList.remove("hidden");
        setTimeout(() => {
          card.style.opacity = "1";
        }, 10);
      } else {
        card.classList.add("hidden");
      }
    });
  }, 300); // Espera a que se desvanezcan antes de mostrar los nuevos

  // Actualiza botones
  buttons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-filter") === filterValue) {
      btn.classList.add("active");
    }
  });
}
