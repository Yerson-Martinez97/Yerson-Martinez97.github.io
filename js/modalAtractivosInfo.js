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
                <h3 class="mural-title">${index + 1}. ${mural.title}</h3>
                <p class="mural-description">${mural.description}</p>`;

                if (Array.isArray(mural.images)) {
                  description += `<div class="mural-images">`;
                  mural.images.forEach((imgUrl) => {
                    description += `<img src="${imgUrl}" alt="" class="mural-image">`;
                  });
                  description += `</div>`;
                }

                if (mural.location) {
                  description += `<p class="mural-location"><a href="${mural.location}" target="_blank">Ver Ruta</a></p>`;
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
                "Información no disponible",
                "No se encontró información para este atractivo.",
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
      console.error("Error al cargar AtractivosInfo.json:", error);
    });
});

// Modal Atractivo
let atractivoLightbox = null;
function openModalAtractivo(title, description, images, location) {
  document.body.style.overflow = "hidden";
  const modal = document.getElementById("modalAtractivo");
  document.getElementById("modalAtractivo-title").innerText = title;
  document.getElementById("modalAtractivo-description").innerHTML = description;
  const imagesContainer = document.getElementById("modalAtractivo-images");
  imagesContainer.innerHTML = "";

  const btnMap = document.getElementById("modalAtractivo-btnMap");
  if (location) {
    btnMap.href = location;
    btnMap.style.display = "inline-block";
  } else {
    btnMap.style.display = "none";
  }

  if (atractivoLightbox) atractivoLightbox.destroy();
  if (images.length) {
    images.forEach((src) => {
      const a = document.createElement("a");
      a.href = src;
      a.classList.add("glightbox-atractivo");
      a.setAttribute("data-gallery", "galeria-atractivo");
      const img = document.createElement("img");
      img.src = src;
      img.alt = title;
      img.classList.add("modalAtractivo-image");
      a.appendChild(img);
      imagesContainer.appendChild(a);
      a.addEventListener("click", (e) => e.preventDefault());
    });
    atractivoLightbox = GLightbox({
      selector: ".glightbox-atractivo",
      touchNavigation: true,
      loop: true,
      zoomable: true,
    });
  }

  modal.style.display = "flex";
}
function closeModalAtractivo() {
  document.body.style.overflow = "auto";
  document.getElementById("modalAtractivo").style.display = "none";
}
