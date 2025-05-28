document.addEventListener("DOMContentLoaded", function () {
  var swiperArtesanias = new Swiper(
    ".boxArtesanias .swiper.artesanias-swiper",
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
        el: ".boxArtesanias .swiper-pagination",
        clickable: true,
        type: "progressbar",
      },
      navigation: {
        nextEl: ".boxArtesanias .swiper-button-next",
        prevEl: ".boxArtesanias .swiper-button-prev",
      },
      direction: "horizontal",
      // speed: 500,
    }
  );

  var modalArtesania = document.querySelector(".modalArtesania");

  function checkArtesaniasModal() {
    var style = window.getComputedStyle(modalArtesania);
    if (style.display === "flex") {
      swiperArtesanias.autoplay.stop();
    } else {
      swiperArtesanias.autoplay.start();
    }
  }

  if ("MutationObserver" in window) {
    var observerArtesanias = new MutationObserver(checkArtesaniasModal);
    observerArtesanias.observe(modalArtesania, {
      attributes: true,
      attributeFilter: ["style"],
    });
  } else {
    setInterval(checkArtesaniasModal, 500);
  }

  checkArtesaniasModal();
});
