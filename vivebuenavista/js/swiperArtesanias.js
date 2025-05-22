document.addEventListener("DOMContentLoaded", () => {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 16,
    breakpoints: {
      600: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
      },
    },
    // Opcional, ejemplo con paginación:
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    // Opcional, ejemplo con navegación:
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
