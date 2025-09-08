document.addEventListener('DOMContentLoaded', function () {
    // Select the About Me and Lets talk buttons
    const buttons = document.querySelectorAll('.btn-box a');

    buttons.forEach(btn => {
        let animating = false;
        let mouse = { x: 0, y: 0 };
        let btnRect = null;
        let tx = 0, ty = 0;

        btn.addEventListener('mousemove', (e) => {
            btnRect = btn.getBoundingClientRect();
            mouse.x = e.clientX - btnRect.left - btnRect.width / 2;
            mouse.y = e.clientY - btnRect.top - btnRect.height / 2;
            if (!animating) animate();
        });

        btn.addEventListener('mouseleave', () => {
            mouse.x = 0;
            mouse.y = 0;
            if (!animating) animate();
        });

        function animate() {
            animating = true;
            // Springy interpolation
            tx += (mouse.x - tx) * 0.18;
            ty += (mouse.y - ty) * 0.18;
            btn.style.transform = `translate(${tx}px, ${ty}px)`;
            if (Math.abs(tx - mouse.x) > 0.5 || Math.abs(ty - mouse.y) > 0.5) {
                requestAnimationFrame(animate);
            } else {
                animating = false;
            }
        }
    });
}); 