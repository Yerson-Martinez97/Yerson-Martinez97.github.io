document.addEventListener("DOMContentLoaded", () => {
  // Atractivos
  fetch("json/AtractivosInfo.json")
    .then((res) => res.json())
    .then((data) => {
      document
        .querySelectorAll(".swiper.atractivos-swiper .swiper-slide.card")
        .forEach((card) => {
          card.addEventListener("click", function () {
            const idAtractivo = this.getAttribute("data-idAtractivo");
            const atractivo = data[idAtractivo];

            if (Array.isArray(atractivo)) {
              let title = "Murales de Buena Vista";
              let description = "";

              atractivo.forEach((mural, index) => {
                description += `<div class="mural-item">
                <h3 class="mural-title"> ${mural.title}</h3>
                <p class="mural-description">${mural.description}</p>`;

                if (Array.isArray(mural.images)) {
                  description += `<div class="mural-images">`;
                  mural.images.forEach((imgUrl) => {
                    description += `<img src="${imgUrl}" alt="" class="mural-image">`;
                  });
                  description += `</div>`;
                }
                if (mural.location) {
                  description += `<p class="mural-location"><a href="${mural.location}" target="_blank"><i class="fa-solid fa-location-dot fa-xl"></i> Ver Ruta</a></p>`;
                }
                description += `</div>`;
              });

              openModalAtractivo(title, description, [], null);
            } else if (atractivo) {
              openModalAtractivo(
                atractivo.title || "Sin título",
                atractivo.description || "Sin descripción",
                atractivo.images || [],
                atractivo.location || ""
              );
            } else {
              openModalAtractivo(
                "No se encontró información.",
                "No se encontró información.",
                [],
                "No se encontró información."
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
      console.error("Error al cargar AtractivosInfo.json:", error);
    });
});

// Modal
import PhotoSwipeLightbox from "../libraries/photoswiper/photoswipe-lightbox.esm.js";
let lightboxInstance = null;

function openModalAtractivo(title, description, images, location) {
  document.body.style.overflow = "hidden";

  const modal = document.getElementById("modalAtractivo");
  // TITLE
  document.getElementById("modalAtractivo-title").innerText = title;
  // DESCRIPTION
  document.getElementById("modalAtractivo-description").innerHTML = description;
  // BTN MAP
  const btnMap = document.getElementById("modalAtractivo-btnMap");
  btnMap.href = location || "#";
  btnMap.style.display = location ? "inline-block" : "none";

  // IMAGES
  const imagesContainer = document.getElementById("modalAtractivo-images");
  imagesContainer.innerHTML = "";
  images.forEach((src, index) => {
    const link = document.createElement("a");
    link.href = src;
    link.setAttribute("data-pswp-width", "1200"); // Ajusta según tamaño real
    link.setAttribute("data-pswp-height", "600"); // Ajusta según tamaño real
    link.style.cursor = "pointer";

    const img = document.createElement("img");
    img.src = src;
    img.alt = title;
    img.classList.add("modalAtractivo-image");

    link.appendChild(img);
    imagesContainer.appendChild(link);
  });

  // Destruye instancia anterior para evitar duplicados
  if (lightboxInstance) {
    lightboxInstance.destroy();
  }

  // Crear nueva instancia de PhotoSwipeLightbox
  lightboxInstance = new PhotoSwipeLightbox({
    gallery: "#modalAtractivo-images",
    children: "a",
    pswpModule: () => import("../libraries/photoswiper/photoswipe.esm.js"),
    showHideAnimationType: "fade",
    loop: false,
    zoom: true,
  });

  lightboxInstance.init();
  // -----
  modal.style.display = "flex";
}

function closeModalAtractivo() {
  document.body.style.overflow = "auto";
  document.getElementById("modalAtractivo").style.display = "none";

  if (lightboxInstance) {
    lightboxInstance.destroy();
    lightboxInstance = null;
  }
}
