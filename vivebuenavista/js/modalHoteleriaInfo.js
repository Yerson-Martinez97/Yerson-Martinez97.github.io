document.addEventListener("DOMContentLoaded", () => {
  // Cargar datos del archivo JSON
  fetch("json/HoteleriaInfo.json")
    .then((res) => res.json())
    .then((data) => {
      // Seleccionamos las tarjetas correctamente
      document
        .querySelectorAll(".swiperHoteleria .swiper-slide.card") // Corregido aquí
        .forEach((card) => {
          card.addEventListener("click", function () {
            const idHoteleria = this.getAttribute("data-idHoteleria");
            const hoteleria = data[idHoteleria];

            if (hoteleria) {
              openModalHoteleria(
                hoteleria.titulo || "Sin título",
                hoteleria.descripcion || "Sin descripción",
                hoteleria.imagenes || []
              );
            } else {
              openModalHoteleria(
                "Información no disponible",
                "No se encontró información para esta hotelería.",
                []
              );
            }
          });
        });

      // Evento para cerrar el modal
      document
        .querySelector("#modalHoteleria-close")
        .addEventListener("click", closeModalHoteleria);

      // Cerrar modal al hacer click fuera del contenido
      window.addEventListener("click", (e) => {
        if (e.target === document.getElementById("modalHoteleria")) {
          closeModalHoteleria();
        }
      });
    })
    .catch((error) => {
      console.error("Error al cargar el JSON:", error);
    });
});

// Variable global para controlar GLightbox
let hoteleriaLightbox = null;

// Función para abrir el modal
function openModalHoteleria(title, description, images) {
  const modalHoteleria = document.getElementById("modalHoteleria");

  // Limpiar contenido previo
  const modalTitle = document.getElementById("modalHoteleria-title");
  const modalDescription = document.getElementById("modalHoteleria-description");
  const modalImages = document.getElementById("modalHoteleria-images");

  // Asegurarse de que el modal esté cerrado antes de agregar contenido
  modalHoteleria.classList.remove("show"); // Remover la clase show (ocultar el modal)

  // Establecer nuevo contenido
  modalTitle.innerText = title;
  modalDescription.innerText = description;
  modalImages.innerHTML = ""; // Limpiar imágenes anteriores

  if (Array.isArray(images) && images.length > 0) {
    images.forEach((src) => {
      const a = document.createElement("a");
      a.href = src;
      a.classList.add("glightbox-hoteleria");
      a.setAttribute("data", "galeria-hoteleria");

      const img = document.createElement("img");
      img.src = src;
      img.alt = title;
      img.classList.add("modalHoteleria-image");

      a.appendChild(img);
      modalImages.appendChild(a);
    });

    // Re-iniciar GLightbox
    if (hoteleriaLightbox) {
      hoteleriaLightbox.destroy();
    }
    hoteleriaLightbox = GLightbox({
      selector: ".glightbox-hoteleria",
      touchNavigation: true,
      loop: true,
      zoomable: true,
    });
  }

  // Añadir la clase "show" para mostrar el modal con transición
  modalHoteleria.classList.add("show");
}

function closeModalHoteleria() {
  // Cerramos el modal sin usar "style.display"
  document.body.style.overflow = "auto"; // Restauramos el overflow
  const modalHoteleria = document.getElementById("modalHoteleria");

  // Removemos la clase "show" para ocultar el modal
  modalHoteleria.classList.remove("show");

  // Re-iniciamos el contenido de imágenes (puedes opcionalmente limpiar el contenido de las imágenes)
  const modalImages = document.getElementById("modalHoteleria-images");
  modalImages.innerHTML = ""; // Limpiar las imágenes si lo deseas
}
