document.addEventListener("DOMContentLoaded", () => {
  fetch("json/ArtesaniasInfo.json")
    .then((res) => res.json())
    .then((data) => {
      document.querySelectorAll(".swiper .swiper-slide.card").forEach((card) => {
        card.addEventListener("click", function () {
          const idArtesania = this.getAttribute("data-idArtesania");
          const artesania = data[idArtesania];

          if (artesania) {
            openModal(
              artesania.titulo || "Sin título",
              artesania.descripcion || "Sin descripción",
              artesania.imagenes || []
            );
          } else {
            openModal(
              "Información no disponible",
              "No se encontró información para esta artesanía.",
              [],
              null
            );
          }
        });
      });

      document
        .getElementById("modalArtesania-close")
        .addEventListener("click", closeModal);

      window.addEventListener("click", (e) => {
        if (e.target === document.getElementById("modalArtesania")) {
          closeModal();
        }
      });
    })
    .catch((error) => {
      console.error("Error al cargar el JSON:", error);
    });
});

// Variable global para controlar GLightbox
let artesaniaLightbox = null;

// Función para abrir el modal
function openModal(title, description, images) {
  document.body.style.overflow = "hidden";

  const modal = document.getElementById("modalArtesania");
  const modalTitle = document.getElementById("modalArtesania-title");
  const modalDescription = document.getElementById(
    "modalArtesania-description"
  );
  const modalImages = document.getElementById("modalArtesania-images");

  modalTitle.innerText = title;
  modalDescription.innerText = description;
  modalImages.innerHTML = "";

  if (artesaniaLightbox) artesaniaLightbox.destroy();

  if (Array.isArray(images) && images.length > 0) {
    images.forEach((src) => {
      const a = document.createElement("a");
      a.href = src;
      a.classList.add("glightbox-artesania");
      a.setAttribute("data", "galeria-artesania");

      const img = document.createElement("img");
      img.src = src;
      img.alt = title;
      img.classList.add("modalArtesania-image");

      a.appendChild(img);
      modalImages.appendChild(a);
    });

    artesaniaLightbox = GLightbox({
      selector: ".glightbox-artesania",
      touchNavigation: true,
      loop: true,
      zoomable: true,
    });
  }

  modal.style.display = "flex";
}

// Función para cerrar el modal
function closeModal() {
  document.body.style.overflow = "auto";
  const modal = document.getElementById("modalArtesania");
  modal.style.display = "none";
}
