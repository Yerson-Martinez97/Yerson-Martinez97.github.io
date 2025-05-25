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
        el: ".boxAtractivos .swiper-pagination",
        clickable: true,
        type: "bullets",
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
      navigation: {
        nextEl: ".boxAtractivos .swiper-button-next",
        prevEl: ".boxAtractivos .swiper-button-prev",
      },
      direction: "horizontal",
      speed: 1000,
    }
  );

  var modalAtractivo = document.querySelector(".modalAtractivo");

  function checkAtractivosModal() {
    var style = window.getComputedStyle(modalAtractivo);
    if (style.display === "flex") {
      swiperAtractivos.autoplay.stop();
    } else {
      swiperAtractivos.autoplay.start();
    }
  }

  if ("MutationObserver" in window) {
    var observerAtractivos = new MutationObserver(checkAtractivosModal);
    observerAtractivos.observe(modalAtractivo, {
      attributes: true,
      attributeFilter: ["style"],
    });
  } else {
    setInterval(checkAtractivosModal, 500);
  }

  checkAtractivosModal();
});
