// Requires Color Thief: <script src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.2/color-thief.umd.js"></script>

document.addEventListener('DOMContentLoaded', function () {
    const colorThief = new ColorThief();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const img = card.querySelector('img.photo, .photo img');
        if (img) {
            // If image is not loaded yet, wait for it
            if (!img.complete) {
                img.addEventListener('load', () => applyColor(card, img));
            } else {
                applyColor(card, img);
            }
        }
    });

    // Add click handler for card navigation
    document.querySelectorAll('.card[data-url]').forEach(card => {
        card.addEventListener('click', function (e) {
            // Optional: Prevent text selection or drag
            if (window.getSelection().toString()) return;
            const url = card.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank'); // Open in new tab
            }
        });
    });

    function applyColor(card, img) {
        let color = [128, 128, 128]; // Default gray
        try {
            color = colorThief.getColor(img);
        } catch (e) {
            console.warn('Color extraction failed for image:', img, e);
        }
        const [r, g, b] = color;
        // Set CSS custom properties for background and glow
        card.style.setProperty('--product-color', `rgb(${r}, ${g}, ${b})`);
        card.style.setProperty('--product-color-light', `rgb(${Math.min(255, r+40)}, ${Math.min(255, g+40)}, ${Math.min(255, b+40)})`);
        card.style.setProperty('--product-color-rgb', `${r}, ${g}, ${b}`);
        // Add glow effect on hover
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = `0 10px 20px rgba(0,0,0,0.4), 0 0 15px rgba(${r},${g},${b},0.6), 0 0 25px rgba(${r},${g},${b},0.3)`;
            card.style.border = `1px solid rgba(${r},${g},${b},0.5)`;
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
            card.style.border = '1px solid rgba(255,255,255,0.1)';
            card.style.transform = 'translateY(0) scale(1)';
        });
    }
}); 