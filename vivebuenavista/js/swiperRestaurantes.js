document.addEventListener("DOMContentLoaded", function () {
  var swiperRestaurante = new Swiper(
    ".boxRestaurante .swiper.restaurante-swiper",
    {
      spaceBetween: 30,
      centeredSlides: true,
      // loop: true,
      effect: "slide",
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".boxRestaurante .swiper-pagination",
        clickable: true,
        type: "progressbar",
      },
      navigation: {
        nextEl: ".boxRestaurante .swiper-button-next",
        prevEl: ".boxRestaurante .swiper-button-prev",
      },
      direction: "horizontal",
      // speed: 500,
    }
  );

  var modalRestaurante = document.querySelector(".modalRestaurante");

  function checkRestauranteModal() {
    var style = window.getComputedStyle(modalRestaurante);
    if (style.display === "flex") {
      swiperRestaurante.autoplay.stop();
    } else {
      swiperRestaurante.autoplay.start();
    }
  }

  if ("MutationObserver" in window) {
    var observerRestaurante = new MutationObserver(checkRestauranteModal);
    observerRestaurante.observe(modalRestaurante, {
      attributes: true,
      attributeFilter: ["style"],
    });
  } else {
    setInterval(checkRestauranteModal, 500);
  }

  checkRestauranteModal();
});
