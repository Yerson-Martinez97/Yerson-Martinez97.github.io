document.addEventListener("DOMContentLoaded", () => {
  const swiperHoteleria = new Swiper(".swiperHoteleria", {
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
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});