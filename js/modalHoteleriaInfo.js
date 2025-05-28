let cardsPerLoad = 3; // Cuántas tarjetas cargar por cada clic en "Ver más"
let visibleCards = 3; // Número de tarjetas visibles actualmente (inicia con 3)
let filteredCards = []; // Tarjetas que están filtradas

// Función que se ejecuta cuando la página se carga
document.addEventListener("DOMContentLoaded", function () {
  filterCards("all"); // Filtrar inicialmente por 'todos' y mostrar las primeras 3
  showCards(visibleCards); // Mostrar las primeras 3 tarjetas
});

// Mostrar las tarjetas según el filtro
function showCards(num) {
  const cards = filteredCards; // Solo trabajamos con las tarjetas filtradas
  cards.forEach((card, index) => {
    if (index < num) {
      card.style.display = "block"; // Mostrar hasta el número de tarjetas visibles
    } else {
      card.style.display = "none"; // Ocultar las demás
    }
  });

  // Mostrar u ocultar el enlace "Ver más" y "Ver menos"
  const seeMoreLink = document.getElementById("ver-mas");
  const seeLessLink = document.getElementById("ver-menos");

  if (filteredCards.length > visibleCards) {
    seeMoreLink.style.display = "block"; // Mostrar el enlace si hay más tarjetas
    seeLessLink.style.display = "none"; // Ocultar el enlace de "Ver menos"
  } else if (filteredCards.length <= visibleCards && visibleCards > 3) {
    seeMoreLink.style.display = "none"; // Ocultar "Ver más" si no hay más tarjetas
    seeLessLink.style.display = "block"; // Mostrar "Ver menos"
  } else {
    seeMoreLink.style.display = "none"; // Ocultar el enlace de "Ver más" cuando no haya más tarjetas
    seeLessLink.style.display = "none"; // No mostrar "Ver menos" si ya hay 3 tarjetas visibles
  }
}

// Función para cargar más o ver menos
function toggleCards(event) {
  event.preventDefault(); // Evita el comportamiento predeterminado del enlace

  const seeMoreLink = document.getElementById("ver-mas");
  const seeLessLink = document.getElementById("ver-menos");

  if (event.target.id === "ver-mas") {
    visibleCards += cardsPerLoad; // Aumentar el número de tarjetas visibles
    showCards(visibleCards); // Mostrar las tarjetas
  } else if (event.target.id === "ver-menos") {
    visibleCards = 3; // Restablecer a 3 tarjetas visibles
    showCards(visibleCards); // Mostrar las primeras 3 tarjetas
  }
}

// Filtrar las tarjetas según el filtro seleccionado
function filterCards(filterValue) {
  const cards = document.querySelectorAll("#linkHoteleria .card");
  const buttons = document.querySelectorAll(".filter-buttons button");

  // Restablecer el número de tarjetas visibles y las tarjetas filtradas
  visibleCards = cardsPerLoad; // Restablecer a 3
  filteredCards = [];

  // Si el filtro es "all", se muestran todas las tarjetas
  if (filterValue === "all") {
    cards.forEach((card) => {
      filteredCards.push(card); // Agregar todas las tarjetas a filteredCards
      card.style.display = "block"; // Asegurarse de que todas se muestren cuando se selecciona "all"
    });
  } else {
    // Si no es "all", se filtra por categoría
    cards.forEach((card) => {
      card.style.display = "none"; // Ocultar todas las tarjetas inicialmente
      if (card.getAttribute("data-category") === filterValue) {
        filteredCards.push(card); // Solo agregar las que coinciden con el filtro
        card.style.display = "block"; // Asegurarse de que se muestren las tarjetas filtradas
      }
    });
  }

  // Mostrar las primeras 3 tarjetas del conjunto filtrado
  showCards(visibleCards);

  // Actualizar el estado de los botones de filtro
  buttons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.getAttribute("data-filter") === filterValue) {
      btn.classList.add("active");
    }
  });
}
// =============================================================================================
// CARDS
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
let hoteleriaLightbox = null;

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

      // Divider
      modalHoteleriaReservations.innerHTML +=
        "<hr class='modalHoteleria-divider'>";
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

    modalHoteleriaSociaNetworks.style.display = "block"; // Asegúrate de que el modal se muestre
    modalHoteleriaSociaNetworks.innerHTML =
      "<div class='title'>Redes Sociales</div>";
    modalHoteleriaSociaNetworks.appendChild(ul);
  } else {
    modalHoteleriaSociaNetworks.style.display = "none"; // Oculta el modal si no hay contenido
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
    modalHoteleriaAtractions.style.display = "block"; // Asegúrate de que el modal se muestre

    modalHoteleriaAtractions.innerHTML = "<div class='title'>Atracciones</div>";
    modalHoteleriaAtractions.appendChild(ul);
  } else {
    modalHoteleriaAtractions.style.display = "none";
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
  // IMAGES
  const modalHoteleriaImages = document.getElementById("modalHoteleria-images");
  modalHoteleriaImages.innerHTML = "";
  if (hoteleriaLightbox) hoteleriaLightbox.destroy();

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
      modalHoteleriaImages.appendChild(a);
    });

    hoteleriaLightbox = GLightbox({
      selector: ".glightbox-hoteleria",
      touchNavigation: true,
      loop: true,
      zoomable: true,
    });
  }
  modalHoteleria.style.display = "flex";
}
// =============================================================================================
// Función para cerrar el modal
function closeModalHoteleria() {
  document.body.style.overflow = "auto";
  const modalHoteleria = document.getElementById("modalHoteleria");
  modalHoteleria.style.display = "none";
}
