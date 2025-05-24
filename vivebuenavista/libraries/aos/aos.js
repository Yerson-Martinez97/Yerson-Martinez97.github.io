AOS.init({
  disable: false, // 🔁 Permitir en móviles
  duration: 800,
  easing: "ease-in-out",
  once: true, // Solo una vez
  offset: 400, // El número en píxeles determina qué tan antes se activa el efecto
  startEvent: "load", // Utiliza el evento 'scroll' para iniciar las animaciones
  // startEvent: "scroll", // Utiliza el evento 'scroll' para iniciar las animaciones
});
