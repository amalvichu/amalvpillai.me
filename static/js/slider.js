// Industry-standard infinite slider: seamless, no jump, no visible duplicates
// Duplicates the card set in the DOM, animates left, and resets transform for a perfect loop

document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.querySelector('.slider-container');
    const sliderWrapper = document.querySelector('.slider-wrapper');
    if (!sliderContainer || !sliderWrapper) {
        console.error('One or more slider elements not found.');
        return;
    }

    // Duplicate content for seamless loop
    const sliderWrapperContent = sliderWrapper.innerHTML;
    sliderWrapper.innerHTML += sliderWrapperContent;

    // Dynamically set animation distance
    const productContainer = sliderWrapper.querySelector('.product-container');
    const totalWidth = productContainer.scrollWidth;
    sliderWrapper.style.animation = `slide-animation-js 10s linear infinite`;

    // Create dynamic keyframes
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
    @keyframes slide-animation-js {
      0% { transform: translateX(0); }
      100% { transform: translateX(-${totalWidth}px); }
    }`;
    document.head.appendChild(styleSheet);

    // Reset animation for seamless loop
    sliderWrapper.addEventListener('animationiteration', () => {
        sliderWrapper.style.animation = 'none';
        // Force reflow
        void sliderWrapper.offsetWidth;
        sliderWrapper.style.animation = `slide-animation-js 10s linear infinite`;
    });

    // Pause on hover for individual cards
    const cards = document.querySelectorAll('.slider-wrapper .card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            sliderWrapper.style.animationPlayState = 'paused';
        });
        card.addEventListener('mouseleave', () => {
            sliderWrapper.style.animationPlayState = 'running';
        });
    });
});
