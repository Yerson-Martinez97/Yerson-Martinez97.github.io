document.addEventListener("DOMContentLoaded", () => {
  fetch("json/AtractivosInfo.json")
    .then((res) => res.json())
    .then((data) => {
      document
        .querySelectorAll(".swiper.atractivos-swiper .swiper-slide.card")
        .forEach((card) => {
          card.addEventListener("click", function () {
            const idAtractivo = this.getAttribute("data-idAtractivo");
            const atractivo = data[idAtractivo];

            if (atractivo) {
              openModalAtractivo(
                atractivo.title || "Sin título",
                atractivo.description || "Sin descripción",
                atractivo.images || [],
                atractivo.location || ""
              );
            } else {
              openModalAtractivo(
                "Información no disponible",
                "No se encontró información para esta artesanía.",
                [],
                null
              );
            }
          });
        });

      document
        .getElementById("modalAtractivo-close")
        .addEventListener("click", closeModalAtractivo);

      window.addEventListener("click", (e) => {
        if (e.target === document.getElementById("modalAtractivo")) {
          closeModalAtractivo();
        }
      });
    })
    .catch((error) => {
      console.error("Error al cargar el JSON:", error);
    });
});

// Variable global para controlar GLightbox
let atractivoLightbox = null;

// Función para abrir el modal
function openModalAtractivo(title, description, images, location) {
  document.body.style.overflow = "hidden";

  const modalAtractivo = document.getElementById("modalAtractivo");
  const modalAtractivoTitle = document.getElementById("modalAtractivo-title");
  const modalAtractivoDescription = document.getElementById(
    "modalAtractivo-description"
  );
  const modalAtractivoImages = document.getElementById("modalAtractivo-images");
  const modalAtractivoBtnMap = document.getElementById("modalAtractivo-btnMap");

  modalAtractivoTitle.innerText = title;
  modalAtractivoDescription.innerText = description;
  modalAtractivoImages.innerHTML = "";

  if (location) {
    modalAtractivoBtnMap.href = location;
  } else {
    modalAtractivoBtnMap.style.display = "none";
  }

  if (atractivoLightbox) atractivoLightbox.destroy();

  if (Array.isArray(images) && images.length > 0) {
    images.forEach((src) => {
      const a = document.createElement("a");
      a.href = src;
      a.classList.add("glightbox-atractivo");
      a.setAttribute("data", "galeria-atractivo");

      const img = document.createElement("img");
      img.src = src;
      img.alt = title;
      img.classList.add("modalAtractivo-image");

      a.appendChild(img);
      modalAtractivoImages.appendChild(a);
    });

    atractivoLightbox = GLightbox({
      selector: ".glightbox-atractivo",
      touchNavigation: true,
      loop: true,
      zoomable: true,
    });
  }
  modalAtractivo.style.display = "flex";
}

// Función para cerrar el modal
function closeModalAtractivo() {
  document.body.style.overflow = "auto";
  const modalAtractivo = document.getElementById("modalAtractivo");
  modalAtractivo.style.display = "none";
}
