document.addEventListener("DOMContentLoaded", () => {
  // Artesanías
  fetch("json/RestaurantesInfo.json")
    .then((res) => res.json())
    .then((data) => {
      document
        .querySelectorAll("#linkFerias .card[data-idFerias]")
        .forEach((card) => {
          card.addEventListener("click", function () {
            const id = this.getAttribute("data-idFerias");
            const ferias = data[id];

            if (ferias) {
              openModalFerias(
                ferias.title || "",
                ferias.stars || "",
                ferias.description || "",
                ferias.opinions || "",
                ferias.businesshours || "",
                ferias.reservations || "",
                ferias.socialnetworks || "",
                ferias.recommendations || "",
                ferias.location || "",
                ferias.images || []
              );
            } else {
              openModalFerias(
                "Información no disponible",
                "No se encontró información.",
                "No se encontró información.",
                "No se encontró información.",
                "No se encontró información.",
                "No se encontró información.",
                "No se encontró información.",
                "No se encontró información.",
                "No se encontró información.",
                []
              );
            }
          });
        });

      document
        .getElementById("modalFeria-close")
        .addEventListener("click", closeModalFerias);
      window.addEventListener("click", (e) => {
        if (e.target === document.getElementById("modalFerias")) {
          closeModalFerias();
        }
      });
    })
    .catch((error) => {
      console.error("Error al cargar FeriasInfo.json:", error);
    });
});

// Variable global para controlar GLightbox
let feriasLightbox = null;
import PhotoSwipeLightbox from "../libraries/photoswiper/photoswipe-lightbox.esm.js";
let lightboxInstance = null;
// Función para abrir el modal
function openModalFerias(
  title,
  stars,
  description,
  opinions,
  businesshours,
  reservations,
  socialnetworks,
  recommendations,
  location,
  images
) {
  document.body.style.overflow = "hidden";

  const modalFerias = document.getElementById("modalFerias");
  const modalFeriasTitle = document.getElementById("modalFerias-title");
  const modalFeriasDescription = document.getElementById(
    "modalFerias-description"
  );
  const modalFeriasImages = document.getElementById("modalFerias-images");

  modalFeriasTitle.innerText = title;
  modalFeriasDescription.innerText = description;

  // =============================================================================================
  // STARS
  const modalFeriastars = document.getElementById("modalFerias-stars");
  modalFeriastars.innerHTML = ""; // Limpiar estrellas anteriores

  // Crear un contenedor para las estrellas y el valor
  const starContainer = document.createElement("div");
  starContainer.classList.add("star-container");

  // Convertir el puntaje en un número flotante
  const fullStars = Math.floor(stars); // Número de estrellas completas
  const partialStar = stars - fullStars; // Parte de la estrella (si existe)

  // Crear las estrellas completas
  for (let i = 0; i < fullStars; i++) {
    const star = document.createElement("i");
    star.classList.add("fas", "fa-star"); // Usar Font Awesome para estrella llena
    starContainer.appendChild(star);
  }

  // Crear la estrella parcial, si hay parte decimal
  if (partialStar > 0) {
    const star = document.createElement("i");
    star.classList.add("fas", "fa-star-half-alt"); // Usar Font Awesome para estrella media
    starContainer.appendChild(star);
  }

  // Rellenar las estrellas vacías restantes (hasta 5)
  for (let i = fullStars + (partialStar > 0 ? 1 : 0); i < 5; i++) {
    const star = document.createElement("i");
    star.classList.add("far", "fa-star"); // Usar Font Awesome para estrella vacía
    starContainer.appendChild(star);
  }

  // Mostrar el valor de las estrellas al lado
  const starValue = document.createElement("span");
  starValue.classList.add("star-value");
  starValue.innerText = `(${stars})`; // Muestra el valor numérico entre paréntesis

  // Añadir las estrellas y el valor al contenedor
  starContainer.appendChild(starValue);

  // Añadir las estrellas y el valor al modal
  modalFeriastars.appendChild(starContainer);

  // =============================================================================================
  // OPINIONS
  const modalFeriasOpinions = document.getElementById("modalFerias-opinions");
  modalFeriasOpinions.innerHTML = opinions;
  // =============================================================================================
  // BUSINESS HOURS
  const modalFeriasBusinessHours = document.getElementById(
    "modalFerias-businesshours"
  );
  modalFeriasBusinessHours.innerHTML = ""; // Limpiar horario anterior

  if (businesshours && Array.isArray(businesshours)) {
    const businessHoursTitle = document.createElement("h3");
    businessHoursTitle.innerText = "Horario de Atención:";
    modalFeriasBusinessHours.appendChild(businessHoursTitle);

    const list = document.createElement("ul");
    if (Array.isArray(businesshours[1])) {
      businesshours[1].forEach((hour) => {
        const li = document.createElement("li");
        const [day, time] = Object.entries(hour)[0];
        li.innerHTML = `<strong>${day}:</strong> ${time}`;
        list.appendChild(li);
      });
    } else {
      modalFeriasBusinessHours.style.display = "none";
    }

    modalFeriasBusinessHours.appendChild(list);
  } else {
    modalFeriasBusinessHours.style.display = "none";
  }
  // =============================================================================================
  // IMAGES
  const imagesContainer = document.getElementById("modalFerias-images");
  imagesContainer.innerHTML = "";
  images.forEach((src, index) => {
    const link = document.createElement("a");
    link.href = src;
    link.setAttribute("data-pswp-width", "2000"); // Ajusta según tamaño real
    link.setAttribute("data-pswp-height", "1200"); // Ajusta según tamaño real
    link.style.cursor = "pointer";

    const img = document.createElement("img");
    img.src = src;
    img.alt = title;
    img.classList.add("modalFerias-image");

    link.appendChild(img);
    imagesContainer.appendChild(link);
  });

  // Destruye instancia anterior para evitar duplicados
  if (lightboxInstance) {
    lightboxInstance.destroy();
  }

  // Crear nueva instancia de PhotoSwipeLightbox
  lightboxInstance = new PhotoSwipeLightbox({
    gallery: "#modalFerias-images",
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
  modalFerias.style.display = "flex";

  // =============================================================================================
  // RESERVATIONS
  const modalFeriasReservations = document.getElementById(
    "modalFerias-reservations"
  );
  modalFeriasReservations.innerHTML = "";

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
        // reservationContainer.innerHTML = "<p>No hay números disponibles</p>";
      }

      // Añadir el contenedor al modal
      modalFeriasReservations.appendChild(reservationContainer);
    });
  } else {
    // Si no existen reservas, mostrar un mensaje
    // modalFeriasReservations.innerHTML = "<p>No hay números disponibles.</p>";
  }
  // =============================================================================================
  // LOCATION
  const modalHoteleriaAddress = document.getElementById("location__address");
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
  // SOCIAL NETWORK
  const modalFeriasociaNetworks = document.getElementById(
    "modalFerias-socialnetworks"
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

    modalFeriasociaNetworks.style.display = "block"; // Asegúrate de que el modal se muestre
    modalFeriasociaNetworks.innerHTML =
      "<div class='title'>Redes Sociales</div>";
    modalFeriasociaNetworks.appendChild(ul);
  } else {
    modalFeriasociaNetworks.style.display = "none"; // Oculta el modal si no hay contenido
  }
  // =============================================================================================
  // RECOMENDATIONS
  const modalFeriasRecommendations = document.getElementById(
    "modalFerias-recommendations"
  );
  if (Array.isArray(recommendations) && recommendations.length > 0) {
    const ul = document.createElement("ul");

    recommendations.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      ul.appendChild(li);
    });

    modalFeriasRecommendations.innerHTML =
      "<div class='title'>Recomendaciones</div>";
    modalFeriasRecommendations.appendChild(ul);
  } else {
    modalFeriasRecommendations.innerHTML = "Información no disponible.";
  }
}

// Función para cerrar el modal
function closeModalFerias() {
  document.body.style.overflow = "auto";
  const modalFerias = document.getElementById("modalFerias");
  modalFerias.style.display = "none";
}
