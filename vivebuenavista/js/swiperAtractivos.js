document.addEventListener("DOMContentLoaded", function () {
  const swiperContainer = document.querySelector(".boxAtractivos .swiper.atractivos-swiper");
  if (!swiperContainer) return;

  const swiperAtractivos = new Swiper(swiperContainer, {
    centeredSlides: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "bullets",
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
  });

  const modalAtractivo = document.querySelector(".modalAtractivo");

  function checkAtractivosModal() {
    const style = window.getComputedStyle(modalAtractivo);
    if (style.display === "flex") {
      swiperAtractivos.autoplay.stop();
    } else {
      swiperAtractivos.autoplay.start();
    }
  }

  if ("MutationObserver" in window) {
    const observerAtractivos = new MutationObserver(checkAtractivosModal);
    observerAtractivos.observe(modalAtractivo, {
      attributes: true,
      attributeFilter: ["style"],
    });
  } else {
    setInterval(checkAtractivosModal, 500);
  }

  checkAtractivosModal();
});
