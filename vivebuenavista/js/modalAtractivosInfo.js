document.addEventListener("DOMContentLoaded", function () {
  // Cargar el archivo JSON y setup modal (igual que antes)
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

      const closeModalButton = document.getElementById("modal-close");
      closeModalButton.addEventListener("click", closeModal);

      window.addEventListener("click", function (event) {
        if (event.target === document.getElementById("modal")) {
          closeModal();
        }
      });
    })
    .catch((error) => {
      console.error("Error al cargar el archivo JSON:", error);
    });

  // Lógica para mostrar tarjetas con animación
  const cardsContainer = document.getElementById("linkAtractivos");
  const allCards = Array.from(
    cardsContainer.querySelectorAll(".cards-container .card")
  );

  const loadMoreBtn = document.getElementById("load-more");

  const initialVisibleCount = 2;
  const loadMoreCount = 3;
  let currentIndex = initialVisibleCount;
  const totalCards = allCards.length;

  function showCards() {
    allCards.forEach((card, index) => {
      if (index < currentIndex) {
        if (card.classList.contains("hidden")) {
          card.classList.remove("hidden");
          card.classList.add("zoom-in");
          card.addEventListener(
            "animationend",
            () => {
              card.classList.remove("zoom-in");
            },
            { once: true }
          );
        }
      } else {
        if (!card.classList.contains("hidden")) {
          card.classList.add("zoom-out");
          card.addEventListener(
            "animationend",
            () => {
              card.classList.remove("zoom-out");
              card.classList.add("hidden");
            },
            { once: true }
          );
        }
      }
    });
    updateLoadMoreButton();
  }

  function updateLoadMoreButton() {
    if (currentIndex >= totalCards) {
      loadMoreBtn.innerHTML =
        "Mostrar menos <br> <i class='fa-solid fa-chevron-up'></i>";
    } else {
      loadMoreBtn.innerHTML =
        "Mostrar más <br> <i class='fa-solid fa-chevron-down'></i>";
    }
  }

  loadMoreBtn.addEventListener("click", function () {
    if (currentIndex >= totalCards) {
      currentIndex = initialVisibleCount; // reset
    } else {
      currentIndex += loadMoreCount;
      if (currentIndex > totalCards) currentIndex = totalCards;
    }
    showCards();
  });

  // Mostrar inicialmente las primeras tarjetas sin animación
  allCards.forEach((card, i) => {
    if (i < currentIndex) card.classList.remove("hidden");
    else card.classList.add("hidden");
  });
  updateLoadMoreButton();
});

// Funciones modal (igual que antes)
function openModal(title, description, images, location) {
  document.body.style.overflow = "hidden";
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalImages = document.getElementById("modal-images");
  const modalBtnMap = document.getElementById("modal-btnMap");

  modalTitle.innerText = title;
  modalDescription.innerHTML = description;

  if (location) {
    modalBtnMap.href = location;
    modalBtnMap.style.display = "inline-block";
  } else {
    modalBtnMap.style.display = "none";
  }

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
      touchNavigation: true,
      loop: true,
      zoomable: true,
    });
  }

  modal.style.display = "block";
}

function closeModal() {
  document.body.style.overflow = "auto";
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}
