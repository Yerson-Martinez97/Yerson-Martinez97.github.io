document.addEventListener("DOMContentLoaded", () => {
  fetch("json/HoteleriaInfo.json")
    .then((res) => res.json())
    .then((data) => {
      document
        .querySelectorAll("#linkHoteleria .cards .card")
        .forEach((card) => {
          card.addEventListener("click", function () {
            const idHoteleria = this.getAttribute("data-idHoteleria");
            const index = this.getAttribute("data-index");

            let hoteleria = null;
            if (idHoteleria && data[idHoteleria]) {
              hoteleria = data[idHoteleria];
            } else if (index && data[parseInt(index)]) {
              hoteleria = data[parseInt(index)];
            }

            if (hoteleria) {
              openModalHoteleria(
                hoteleria.title || "",
                hoteleria.reservations || null,
                hoteleria.website || "",
                hoteleria.socialnetworks || "",
                hoteleria.services || "",
                hoteleria.atractions || "",
                hoteleria.location || "",
                hoteleria.images || []
              );
            } else {
              openModalHoteleria("", "", "", "", "", "", [], null);
            }
          });
        });

      document
        .getElementById("modalHoteleria-close")
        .addEventListener("click", closeModalHoteleria);

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
import PhotoSwipeLightbox from "../libraries/photoswiper/photoswipe-lightbox.esm.js";
let lightboxInstance = null;

// Función para abrir el modal
function openModalHoteleria(
  title,
  reservations,
  website,
  socialnetworks,
  services,
  atractions,
  location,
  images
) {
  document.body.style.overflow = "hidden";
  const modalHoteleria = document.getElementById("modalHoteleria");
  const modalHoteleriaTitle = document.getElementById("modalHoteleria-title");
  modalHoteleriaTitle.innerText = title;

  // =============================================================================================
  // RESERVATIONS
  const modalHoteleriaReservations = document.getElementById(
    "modalHoteleria-reservations"
  );

  // Limpia el contenido previo
  modalHoteleriaReservations.innerHTML = "";

  // Verificar si reservations existe y es un array
  if (Array.isArray(reservations) && reservations.length > 0) {
    reservations.forEach((reservation) => {
      // Crea un contenedor flex
      const reservationContainer = document.createElement("div");
      reservationContainer.classList.add("reservation-container");

      let hasPhones = false; // Bandera para verificar si hay teléfonos

      // Para Fijo
      if (reservation.Landline && reservation.Landline.length > 0) {
        const fixedContainer = document.createElement("div");
        fixedContainer.classList.add("fixed-container");
        fixedContainer.innerHTML = "<strong>Fijo:</strong><br>";

        reservation.Landline.forEach((fixedPhone) => {
          fixedContainer.innerHTML += `<p>${fixedPhone}</p>`;
        });
        reservationContainer.appendChild(fixedContainer);
        hasPhones = true; // Se encuentra al menos un teléfono fijo
      }

      // Para Móvil
      if (reservation.Mobile && reservation.Mobile.length > 0) {
        const mobileContainer = document.createElement("div");
        mobileContainer.classList.add("mobile-container");
        mobileContainer.innerHTML = "<strong>Whatsapp</strong><br>";

        reservation.Mobile.forEach((mobilePhone) => {
          mobileContainer.innerHTML += `
        <p>
            <i class="fa-brands fa-whatsapp sn-whatsapp"></i>
            <a href="https://wa.me/${mobilePhone.replace(
              /\s+/g,
              ""
            )}" target="_blank">${mobilePhone}</a>
        </p>
      `;
        });
        reservationContainer.appendChild(mobileContainer);
        hasPhones = true; // Se encuentra al menos un teléfono móvil
      }

      // Si no hay números fijos ni móviles, mostramos un mensaje
      if (!hasPhones) {
        reservationContainer.innerHTML = "<p>No hay números disponibles</p>";
      }

      // Añadir el contenedor al modal
      modalHoteleriaReservations.appendChild(reservationContainer);
    });
  } else {
    // Si no existen reservas, mostrar un mensaje
    modalHoteleriaReservations.innerHTML = "<p>No hay números disponibles.</p>";
  }
  // =============================================================================================
  // WEBSITE
  const modalHoteleriaWebsite = document.getElementById(
    "modalHoteleria-website"
  );
  modalHoteleriaWebsite.innerHTML =
    website != "" ? `<i class='fa-solid fa-link icon-link'></i> ` : "";
  modalHoteleriaWebsite.innerHTML += website != "" ? `Sitio Web` : "";
  modalHoteleriaWebsite.href = website;
  // =============================================================================================
  // SOCIAL NETWORK
  const modalHoteleriaSociaNetworks = document.getElementById(
    "modalHoteleria-socialnetworks"
  );

  if (Array.isArray(socialnetworks) && socialnetworks.length > 0) {
    const ul = document.createElement("ul");

    socialnetworks.forEach((item) => {
      for (let key in item) {
        const li = document.createElement("li");
        const red = item[key];

        if (Array.isArray(red)) {
          let icon = "";
          let name = "";
          let link = "";

          red.forEach((r) => {
            if (r.icon) icon = r.icon;
            if (r.name) name = r.name;
            if (r.link) link = r.link;
          });

          li.innerHTML = `<a href="${link}" target="_blank" rel="noopener" class="sn-${key}" title="${name}">
                        ${icon}
                      </a>`;
        } else {
          li.textContent = `${key}: ${item[key]}`;
        }

        ul.appendChild(li);
      }
    });

    modalHoteleriaSociaNetworks.style.display = "block";
    modalHoteleriaSociaNetworks.innerHTML =
      "<div class='title'>Redes Sociales</div>";
    modalHoteleriaSociaNetworks.appendChild(ul);
  } else {
    modalHoteleriaSociaNetworks.style.display = "none";
  }

  // =============================================================================================
  // SERVICES
  const modalHoteleriaServices = document.getElementById(
    "modalHoteleria-services"
  );
  if (Array.isArray(services) && services.length > 0) {
    const ul = document.createElement("ul");

    services.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      ul.appendChild(li);
    });

    modalHoteleriaServices.innerHTML = "<div class='title'>Servicios</div>";
    modalHoteleriaServices.appendChild(ul);
  } else {
    modalHoteleriaServices.innerHTML = "Información no disponible.";
  }
  // =============================================================================================
  // ATRACTIONS
  const modalHoteleriaAtractions = document.getElementById(
    "modalHoteleria-atractions"
  );

  if (Array.isArray(atractions) && atractions.length > 0) {
    const ul = document.createElement("ul");

    atractions.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      ul.appendChild(li);
    });
    modalHoteleriaAtractions.style.display = "block";

    modalHoteleriaAtractions.innerHTML = "<div class='title'>Atracciones</div>";
    modalHoteleriaAtractions.appendChild(ul);
  } else {
    modalHoteleriaAtractions.style.display = "none";
  }
  // =============================================================================================
  // LOCATION
  const modalHoteleriaAddress = document.getElementById(
    "restaurante-location__address"
  );
  const modalHoteleriaBtnMap = document.getElementById("modalHoteleria-btnMap");

  if (location && Array.isArray(location)) {
    // Buscar la dirección y el URL del mapa dentro del array location
    let addressText = "";
    let mapUrl = "";

    location.forEach((item) => {
      if (item.address) {
        addressText = item.address;
      }
      if (item.map_url) {
        mapUrl = item.map_url;
      }
    });

    modalHoteleriaAddress.textContent =
      addressText || "Dirección no disponible";

    if (mapUrl) {
      modalHoteleriaBtnMap.href = mapUrl;
      modalHoteleriaBtnMap.style.display = "inline-block"; // Mostrar botón
    } else {
      modalHoteleriaBtnMap.style.display = "none"; // Ocultar botón si no hay URL
    }
  } else {
    modalHoteleriaBtnMap.style.display = "none";
    modalHoteleriaAddress.textContent = "Dirección no disponible";
    modalHoteleriaBtnMap.style.display = "none";
  }
  // =============================================================================================
  // IMAGES
  const imagesContainer = document.getElementById("modalHoteleria-images");
  imagesContainer.innerHTML = "";
  images.forEach((src, index) => {
    const link = document.createElement("a");
    link.href = src;
    link.setAttribute("data-pswp-width", "2560"); // Ajusta según tamaño real
    link.setAttribute("data-pswp-height", "1400"); // Ajusta según tamaño real
    link.style.cursor = "pointer";

    const img = document.createElement("img");
    img.src = src;
    img.alt = title;
    img.classList.add("modalHoteleria-image");

    link.appendChild(img);
    imagesContainer.appendChild(link);
  });

  // Destruye instancia anterior para evitar duplicados
  if (lightboxInstance) {
    lightboxInstance.destroy();
  }

  // Crear nueva instancia de PhotoSwipeLightbox
  lightboxInstance = new PhotoSwipeLightbox({
    gallery: "#modalHoteleria-images",
    children: "a",
    pswpModule: () => import("../libraries/photoswiper/photoswipe.esm.js"),
    showHideAnimationType: "fade",
    loop: false,
    zoom: true,
    showHideAnimationType: "zoom",
    bgOpacity: 0.8,
    clickToCloseNonZoomable: true,
    tapAction: "toggle-controls",
    preload: [1, 1],
  });

  lightboxInstance.init();
  modalHoteleria.style.display = "flex";
}
// =============================================================================================
// Función para cerrar el modal
function closeModalHoteleria() {
  document.body.style.overflow = "auto";
  const modalHoteleria = document.getElementById("modalHoteleria");
  modalHoteleria.style.display = "none";
}
