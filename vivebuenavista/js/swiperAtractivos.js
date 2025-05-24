document.addEventListener("DOMContentLoaded", function () {
  var swiperAtractivos = new Swiper(
    ".boxAtractivos .swiper.atractivos-swiper",
    {
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      effect: "slide",
      autoplay: {
        delay: 3000,
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
  var modalAtractivo = document.querySelector(".modalAtractivo");

  // Función para verificar si el modal está visible
  function checkModalVisibility() {
    var style = window.getComputedStyle(modalAtractivo);
    if (style.display === "flex") {
      swiperAtractivos.autoplay.stop(); // Detener el autoplay si el modal está visible
    } else {
      swiperAtractivos.autoplay.start(); // Reiniciar el autoplay si el modal NO está visible
    }
  }

  if ("MutationObserver" in window) {
    var observer = new MutationObserver(checkModalVisibility);
    observer.observe(modalAtractivo, {
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
