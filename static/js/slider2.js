document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.querySelector('.slider-container-2');
    const sliderWrapper = document.querySelector('.slider-wrapper-2');
    if (!sliderContainer || !sliderWrapper) {
        console.error('One or more slider elements not found.');
        return;
    }

    // Duplicate content for seamless loop
    const sliderWrapperContent = sliderWrapper.innerHTML;
    sliderWrapper.innerHTML += sliderWrapperContent;



    let animationRunning = true; // Flag to track animation state

    // Pause on hover for individual cards
    const cards = document.querySelectorAll('.slider-wrapper-2 .card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (animationRunning) {
                sliderWrapper.style.animationPlayState = 'paused';
            }
        });
        card.addEventListener('mouseleave', () => {
            if (animationRunning) {
                sliderWrapper.style.animationPlayState = 'running';
            }
        });
    });
});