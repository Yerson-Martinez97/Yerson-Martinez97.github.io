document.addEventListener("DOMContentLoaded", () => {
  fetch("json/ArtesaniasInfo.json")
    .then((res) => res.json())
    .then((data) => {
      document
        .querySelectorAll(".swiper.restaurantes-swiper .swiper-slide.card")
        .forEach((card) => {
          card.addEventListener("click", function () {
            const idRestaurante = this.getAttribute("data-idRestaurante");
            const restaurante = data[idRestaurante];

            if (restaurante) {
              openModalRestaurante(
                restaurante.title || "Sin título",
                restaurante.description || "Sin descripción",
                restaurante.images || []
              );
            } else {
              openModalRestaurante(
                "Información no disponible",
                "No se encontró información para esta artesanía.",
                [],
                null
              );
            }
          });
        });

      document
        .getElementById("modalRestaurante-close")
        .addEventListener("click", closeModalRestaurante);

      window.addEventListener("click", (e) => {
        if (e.target === document.getElementById("modalRestaurante")) {
          closeModalRestaurante();
        }
      });
    })
    .catch((error) => {
      console.error("Error al cargar el JSON:", error);
    });
});

// Variable global para controlar GLightbox
let restauranteLightbox = null;

// Función para abrir el modal
function openModalRestaurante(title, description, images) {
  document.body.style.overflow = "hidden";

  const modalRestaurante = document.getElementById("modalRestaurante");
  const modalRestauranteTitle = document.getElementById(
    "modalRestaurante-title"
  );
  const modalRestauranteDescription = document.getElementById(
    "modalRestaurante-description"
  );
  const modalRestauranteImages = document.getElementById(
    "modalRestaurante-images"
  );

  modalRestauranteTitle.innerText = title;
  modalRestauranteDescription.innerText = description;
  modalRestauranteImages.innerHTML = "";

  if (restauranteLightbox) restauranteLightbox.destroy();

  if (Array.isArray(images) && images.length > 0) {
    images.forEach((src) => {
      const a = document.createElement("a");
      a.href = src;
      a.classList.add("glightbox-restaurante");
      a.setAttribute("data", "galeria-restaurante");

      const img = document.createElement("img");
      img.src = src;
      img.alt = title;
      img.classList.add("modalRestaurante-image");

      a.appendChild(img);
      modalRestauranteImages.appendChild(a);
    });

    restauranteLightbox = GLightbox({
      selector: ".glightbox-restaurante",
      touchNavigation: true,
      loop: true,
      zoomable: true,
    });
  }
  modalRestaurante.style.display = "flex";
}

// Función para cerrar el modal
function closeModalRestaurante() {
  document.body.style.overflow = "auto";
  const modalRestaurante = document.getElementById("modalRestaurante");
  modalRestaurante.style.display = "none";
}
