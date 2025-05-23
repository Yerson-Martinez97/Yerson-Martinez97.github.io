document.addEventListener("DOMContentLoaded", function () {
  var swiperArtesanias = new Swiper(
    ".boxArtesanias .swiper.artesanias-swiper",
    {
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      effect: "fade",
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        type: "progressbar",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      direction: "horizontal",
      speed: 1500,
    }
  );

  // Selector del modal
  var modalArtesania = document.querySelector(".modalArtesania");

  // Función para verificar si el modal está visible
  function checkModalVisibility() {
    var style = window.getComputedStyle(modalArtesania);
    if (style.display === "flex") {
      swiperArtesanias.autoplay.stop(); // Detener el autoplay si el modal está visible
    } else {
      swiperArtesanias.autoplay.start(); // Reiniciar el autoplay si el modal NO está visible
    }
  }

  if ("MutationObserver" in window) {
    var observer = new MutationObserver(checkModalVisibility);
    observer.observe(modalArtesania, {
      attributes: true,
      attributeFilter: ["style"],
    });
  } else {
    // Fallback para navegadores antiguos (IE)
    setInterval(checkModalVisibility, 500); // Usar polling en lugar de MutationObserver
  }

  // Verificar el estado inicial en caso de que el modal ya esté visible al cargar la página
  checkModalVisibility();
});
