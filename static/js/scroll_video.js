document.addEventListener('DOMContentLoaded', function() {
    const parallaxSection = document.querySelector('.parallax-1');
    const video = parallaxSection.querySelector('.bg-video');

    if (!parallaxSection || !video) {
        console.error('Parallax section or video element not found.');
        return;
    }

    // Ensure video is ready to play
    video.pause();
    video.currentTime = 0;

    // Function to update video playback based on scroll
    function updateVideoPlayback() {
        const sectionTop = parallaxSection.offsetTop;
        const sectionHeight = parallaxSection.offsetHeight;
        const scrollY = window.scrollY;

        // Calculate how far into the section the user has scrolled
        // This value will be 0 when the top of the section is at the top of the viewport
        // and 1 when the bottom of the section is at the top of the viewport
        const scrollProgress = (scrollY - sectionTop) / sectionHeight;

        // Clamp the progress between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));

        // Map the scroll progress to the video's duration
        video.currentTime = video.duration * clampedProgress;
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateVideoPlayback);

    // Initial update in case the user loads the page already scrolled
    updateVideoPlayback();
});