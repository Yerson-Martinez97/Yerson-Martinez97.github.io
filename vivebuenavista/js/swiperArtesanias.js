document.addEventListener("DOMContentLoaded", () => {
const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  spaceBetween: 16,
  breakpoints: {
    600: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

});
