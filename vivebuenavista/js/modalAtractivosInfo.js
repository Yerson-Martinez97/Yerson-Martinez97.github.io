document.addEventListener("DOMContentLoaded", function () {
  // Cargar el archivo JSON
  fetch("json/AtractivosInfo.json")
    .then((response) => response.json())
    .then((data) => {
      const cards = document.querySelectorAll(".card");
      cards.forEach((card) => {
        card.addEventListener("click", function () {
          const idAtractivo = this.getAttribute("data-idAtractivo");
          const atractivo = data[idAtractivo];

          if (atractivo) {
            if (Array.isArray(atractivo)) {
              let contenidoHTML = "";
              atractivo.forEach((item) => {
                contenidoHTML += `
                  <div class="mural-item">
                    <h3>${item.titulo}</h3>
                    <p>${item.descripcion || "Sin descripción disponible."}</p>
                    ${item.imagenes
                      ?.map(
                        (src) => `<img src="${src}" alt="${item.titulo}" />`
                      )
                      .join("")}
                    <a href="${
                      item.location
                    }" target="_blank" class="btn btn-map">Ver en mapa</a>
                    <hr>
                  </div>
                `;
              });
              openModal("Murales", contenidoHTML, [], null, true);
            } else {
              openModal(
                atractivo.titulo,
                atractivo.descripcion,
                atractivo.imagenes,
                atractivo.location
              );
            }
          }
        });
      });

      // Cerrar el modal cuando se hace clic en el botón de cierre
      const closeModalButton = document.getElementById("modal-close");
      closeModalButton.addEventListener("click", closeModal);

      // Cerrar el modal si se hace clic fuera del contenido
      window.addEventListener("click", function (event) {
        if (event.target === document.getElementById("modal")) {
          closeModal();
        }
      });
    })
    .catch((error) => {
      console.error("Error al cargar el archivo JSON:", error);
    });

  // Lógica de mostrar tarjetas
  const cardsContainer = document.getElementById("linkAtractivos");
  const allCards = Array.from(
    cardsContainer.querySelectorAll(".cards-container .card")
  );

  const loadMoreBtn = document.getElementById("load-more");

  const initialVisibleCount = 1;
  const loadMoreCount = 3;
  let currentIndex = initialVisibleCount;

  const totalCards = allCards.length;

  function showCards() {
    allCards.forEach((card, index) => {
      if (index < currentIndex) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });

    updateLoadMoreButton();
  }

  function updateLoadMoreButton() {
    if (currentIndex >= totalCards) {
      loadMoreBtn.innerHTML = "<i class='fa-solid fa-chevron-up'></i>";
    } else {
      loadMoreBtn.innerHTML = "<i class='fa-solid fa-chevron-down'></i>";
    }
  }

  loadMoreBtn.addEventListener("click", function () {
    if (currentIndex >= totalCards) {
      currentIndex = initialVisibleCount; // Resetear a las primeras visibles
    } else {
      currentIndex += loadMoreCount;
      if (currentIndex > totalCards) {
        currentIndex = totalCards;
      }
    }

    showCards();
  });

  // Mostrar inicialmente las primeras tarjetas
  showCards();
});

// Función para abrir el modal y cargar el contenido dinámicamente
function openModal(title, description, images, location) {
  document.body.style.overflow = "hidden";
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalImages = document.getElementById("modal-images");
  const modalBtnMap = document.getElementById("modal-btnMap");

  // Setear título y descripción
  modalTitle.innerText = title;
  modalDescription.innerHTML = description;

  if (location) {
    modalBtnMap.href = location;
    modalBtnMap.style.display = "inline-block"; // o "block", según tu diseño
  } else {
    modalBtnMap.style.display = "none";
  }

  // Limpiar imágenes anteriores
  modalImages.innerHTML = "";

  let lightbox = null;

  if (images && images.length > 0) {
    images.forEach((imageSrc) => {
      const a = document.createElement("a");
      a.href = imageSrc;
      a.classList.add("glightbox");
      a.setAttribute("data-gallery", "galeria");

      const img = document.createElement("img");
      img.src = imageSrc;
      img.classList.add("modal-image");

      a.appendChild(img);
      modalImages.appendChild(a);
    });

    if (lightbox) lightbox.destroy();

    lightbox = GLightbox({
      selector: ".glightbox",
    });
  }

  modal.style.display = "block";
}

// Función para cerrar el modal
function closeModal() {
  document.body.style.overflow = "auto";
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}
