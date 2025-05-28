document.addEventListener("DOMContentLoaded", function () {
  var swiperFerias = new Swiper(".boxFerias .swiper.ferias-swiper", {
    effect: "cards",
    grabCursor: true,
    // loop: true,
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
  });
  var modalFeria = document.querySelector(".modalFeria");

  function checkFeriasModal() {
    var style = window.getComputedStyle(modalFeria);
    if (style.display === "flex") {
      swiperFerias.autoplay.stop();
    } else {
      swiperFerias.autoplay.start();
    }
  }

  if ("MutationObserver" in window) {
    var observerFerias = new MutationObserver(checkFeriasModal);
    observerFerias.observe(modalFeria, {
      attributes: true,
      attributeFilter: ["style"],
    });
  } else {
    setInterval(checkFeriasModal, 500);
  }

  checkFeriasModal();
});
