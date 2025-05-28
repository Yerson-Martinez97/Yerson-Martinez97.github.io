document.addEventListener("DOMContentLoaded", () => {
  fetch("json/FeriasInfo.json")
    .then((res) => res.json())
    .then((data) => {
      document
        .querySelectorAll(".swiper.ferias-swiper .swiper-slide.card")
        .forEach((card) => {
          card.addEventListener("click", function () {
            const idFeria = this.getAttribute("data-idFeria");
            const feria = data[idFeria];

            if (feria) {
              openModalFeria(
                feria.title || "Sin título",
                feria.description || "Sin descripción",
                feria.event || "Sin fecha"
              );
            } else {
              openModalFeria(
                "Información no disponible",
                "No se encontró información para esta feria.",
                "No hay fecha del evento"
              );
            }
          });
        });

      document
        .getElementById("modalFeria-close")
        .addEventListener("click", closeModalFeria);

      window.addEventListener("click", (e) => {
        if (e.target === document.getElementById("modalFeria")) {
          closeModalFeria();
        }
      });
    })
    .catch((error) => {
      console.error("Error al cargar el JSON:", error);
    });
});

// Variable global para controlar GLightbox
let feriaLightbox = null;

// Función para abrir el modal
function openModalFeria(title, description, event) {
  document.body.style.overflow = "hidden";

  const modalFeria = document.getElementById("modalFeria");
  const modalFeriaTitle = document.getElementById("modalFeria-title");
  const modalFeriaDescription = document.getElementById(
    "modalFeria-description"
  );
  const modalEvent = document.getElementById("modalFeria-event");

  modalFeriaTitle.innerText = title;
  modalFeriaDescription.innerText = description;
  modalEvent.innerHTML = event;

  modalFeria.style.display = "flex";
}

// Función para cerrar el modal
function closeModalFeria() {
  document.body.style.overflow = "auto";
  const modalFeria = document.getElementById("modalFeria");
  modalFeria.style.display = "none";
}
