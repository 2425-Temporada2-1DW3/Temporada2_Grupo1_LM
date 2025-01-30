document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    // Puedes ajustar el intervalo de tiempo según tus preferencias (en milisegundos)
    setInterval(nextSlide, 6000);

    // Mostrar la primera imagen al cargar la página
    showSlide(currentIndex);
});