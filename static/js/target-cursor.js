// cursor-animations.js
// Unified cursor animation effects: target reticle and magnetic buttons
(function() {
    // --- Target Reticle Cursor Animation for Hero Section ---
    const section = document.querySelector('.intro');
    const canvas = document.getElementById('target-cursor-canvas');
    if (!section || !canvas) return;
    const ctx = canvas.getContext('2d');
    let width = section.offsetWidth;
    let height = section.offsetHeight;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    window.addEventListener('resize', () => {
        width = section.offsetWidth;
        height = section.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
    });

    let mouse = { x: width / 2, y: height / 2 };
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    const targets = Array.from(section.querySelectorAll('.target-cursor-target'));

    // Reticle state: center x/y, width, height
    let reticle = {
        x: mouse.x,
        y: mouse.y,
        w: 21,
        h: 21
    };
    let targetRect = null;
    let animatingToTarget = false;

    targets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            const rect = el.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();
            targetRect = {
                x: rect.left - sectionRect.left + rect.width / 2,
                y: rect.top - sectionRect.top + rect.height / 2,
                w: rect.width + 8, // padding for highlight
                h: rect.height + 8
            };
            animatingToTarget = true;
        });
        el.addEventListener('mouseleave', () => {
            targetRect = null;
            animatingToTarget = false;
        });
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Animate reticle position and size
        if (targetRect && animatingToTarget) {
            reticle.x += (targetRect.x - reticle.x) * 0.18;
            reticle.y += (targetRect.y - reticle.y) * 0.18;
            reticle.w += (targetRect.w - reticle.w) * 0.18;
            reticle.h += (targetRect.h - reticle.h) * 0.18;
        } else {
            reticle.x += (mouse.x - reticle.x) * 0.35;
            reticle.y += (mouse.y - reticle.y) * 0.35;
            reticle.w += (21 - reticle.w) * 0.18;
            reticle.h += (21 - reticle.h) * 0.18;
        }

        // Animate corner length
        let lTarget = (targetRect && animatingToTarget) ? 12 : 5;
        if (!reticle.l) reticle.l = lTarget;
        reticle.l += (lTarget - reticle.l) * 0.18;
        const l = reticle.l;
        const lw = 2;
        const color = 'rgba(255,255,255,0.85)';
        const x0 = reticle.x - reticle.w / 2;
        const y0 = reticle.y - reticle.h / 2;
        const x1 = reticle.x + reticle.w / 2;
        const y1 = reticle.y + reticle.h / 2;

        ctx.save();
        ctx.strokeStyle = color;
        ctx.lineWidth = lw;
        ctx.shadowColor = 'rgba(80,200,255,0.5)';
        ctx.shadowBlur = 3;

        // Top-left
        ctx.beginPath();
        ctx.moveTo(x0, y0 + l);
        ctx.lineTo(x0, y0);
        ctx.lineTo(x0 + l, y0);
        ctx.stroke();

        // Top-right
        ctx.beginPath();
        ctx.moveTo(x1 - l, y0);
        ctx.lineTo(x1, y0);
        ctx.lineTo(x1, y0 + l);
        ctx.stroke();

        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(x1, y1 - l);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x1 - l, y1);
        ctx.stroke();

        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(x0 + l, y1);
        ctx.lineTo(x0, y1);
        ctx.lineTo(x0, y1 - l);
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(reticle.x, reticle.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.shadowBlur = 0;
        ctx.fill();

        ctx.restore();

        requestAnimationFrame(animate);
    }
    animate();

    // --- Hide reticle and show default cursor for certain elements ---
    const aboutBtn = section.querySelector('.btn-box a:nth-child(1)');
    const talkBtn = section.querySelector('.btn-box a:nth-child(2)');
    const mediaContainer = section.querySelector('.media');

    function showDefaultCursor() {
        canvas.style.display = 'none';
        section.style.cursor = 'auto';
    }
    function showReticleCursor() {
        canvas.style.display = '';
        section.style.cursor = 'none';
    }

    [aboutBtn, talkBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('mouseenter', showDefaultCursor);
            btn.addEventListener('mouseleave', showReticleCursor);
        }
    });
    if (mediaContainer) {
        mediaContainer.addEventListener('mouseenter', showDefaultCursor);
        mediaContainer.addEventListener('mouseleave', showReticleCursor);
    }
    section.addEventListener('mouseleave', showDefaultCursor);
    section.addEventListener('mouseenter', showReticleCursor);

    const descParagraph = section.querySelector('.intro-content p');
    let belowParagraph = false;

    section.addEventListener('mousemove', (e) => {
        if (!descParagraph) return;
        const rect = section.getBoundingClientRect();
        const paraRect = descParagraph.getBoundingClientRect();
        const mouseY = e.clientY - rect.top;
        const paraBottom = paraRect.bottom - rect.top;
        if (mouseY > paraBottom) {
            if (!belowParagraph) {
                showDefaultCursor();
                belowParagraph = true;
            }
        } else {
            if (belowParagraph) {
                showReticleCursor();
                belowParagraph = false;
            }
        }
    });

    // --- Magnetic Button Effect (magnetism works even when cursor is near, not just inside) ---
    const buttons = section.querySelectorAll('.btn-box a');
    let mouseGlobal = { x: 0, y: 0 };

    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        mouseGlobal.x = e.clientX - rect.left;
        mouseGlobal.y = e.clientY - rect.top;
    });

    buttons.forEach(btn => {
        let animating = false;
        let tx = 0, ty = 0;
        let btnRect = null, btnCenter = { x: 0, y: 0 };

        function animateMagnet() {
            btnRect = btn.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();
            btnCenter.x = btnRect.left - sectionRect.left + btnRect.width / 2;
            btnCenter.y = btnRect.top - sectionRect.top + btnRect.height / 2;

            // Distance from mouse to button center
            const dx = mouseGlobal.x - btnCenter.x;
            const dy = mouseGlobal.y - btnCenter.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Only apply magnetism if within 60px
            const magnetRadius = 60;
            let targetX = 0, targetY = 0;
            if (dist < magnetRadius) {
                targetX = dx * 0.4;
                targetY = dy * 0.4;
            }

            tx += (targetX - tx) * 0.12;
            ty += (targetY - ty) * 0.12;
            btn.style.transform = `translate(${tx}px, ${ty}px)`;

            if (Math.abs(tx - targetX) > 0.5 || Math.abs(ty - targetY) > 0.5) {
                requestAnimationFrame(animateMagnet);
            } else {
                animating = false;
            }
        }

        section.addEventListener('mousemove', () => {
            btnRect = btn.getBoundingClientRect();
            const sectionRect = section.getBoundingClientRect();
            btnCenter.x = btnRect.left - sectionRect.left + btnRect.width / 2;
            btnCenter.y = btnRect.top - sectionRect.top + btnRect.height / 2;
            const dx = mouseGlobal.x - btnCenter.x;
            const dy = mouseGlobal.y - btnCenter.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const magnetRadius = 60; // tighter area
            if (dist < magnetRadius) {
                if (!animating) {
                    animating = true;
                    animateMagnet();
                }
            }
        });

        btn.addEventListener('mouseleave', () => {
            // When mouse leaves the button, keep animating until it returns to center
            if (!animating) {
                animating = true;
                animateMagnet();
            }
        });
    });
})();