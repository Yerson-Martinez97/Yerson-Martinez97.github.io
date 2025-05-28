document.addEventListener("DOMContentLoaded", () => {
  // Artesanías
  fetch("json/ArtesaniasInfo.json")
    .then((res) => res.json())
    .then((data) => {
      document.querySelectorAll(".card[data-idArtesania]").forEach((card) => {
        card.addEventListener("click", function () {
          const id = this.getAttribute("data-idArtesania");
          const artesania = data[id];

          if (artesania) {
            openModalArtesania(
              artesania.title || "Sin título",
              artesania.description || "Sin descripción",
              artesania.images || []
            );
          } else {
            openModalArtesania(
              "Información no disponible",
              "No se encontró información.",
              []
            );
          }
        });
      });

      document
        .getElementById("modalArtesania-close")
        .addEventListener("click", closeModalArtesania);
      window.addEventListener("click", (e) => {
        if (e.target === document.getElementById("modalArtesania")) {
          closeModalArtesania();
        }
      });
    })
    .catch((error) => {
      console.error("Error al cargar ArtesaniasInfo.json:", error);
    });
});

// Variable global para controlar GLightbox
let artesaniaLightbox = null;

// Función para abrir el modal
function openModalArtesania(title, description, images) {
  document.body.style.overflow = "hidden";

  const modalArtesania = document.getElementById("modalArtesania");
  const modalArtesaniaTitle = document.getElementById("modalArtesania-title");
  const modalArtesaniaDescription = document.getElementById(
    "modalArtesania-description"
  );
  const modalArtesaniaImages = document.getElementById("modalArtesania-images");

  modalArtesaniaTitle.innerText = title;
  modalArtesaniaDescription.innerText = description;
  modalArtesaniaImages.innerHTML = "";

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
      modalArtesaniaImages.appendChild(a);
    });

    artesaniaLightbox = GLightbox({
      selector: ".glightbox-artesania",
      touchNavigation: true,
      loop: true,
      zoomable: true,
    });
  }
  modalArtesania.style.display = "flex";
}

// Función para cerrar el modal
function closeModalArtesania() {
  document.body.style.overflow = "auto";
  const modalArtesania = document.getElementById("modalArtesania");
  modalArtesania.style.display = "none";
}
