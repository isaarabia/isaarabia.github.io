document.addEventListener('DOMContentLoaded', function () {
    let scrollPosition = 0;
    let panelRevealed = false;

    document.addEventListener('wheel', function (event) {
        if (panelRevealed) return; // Once revealed, do nothing

        event.preventDefault(); // Prevent default scrolling

        // Increase scroll position based on scroll event
        scrollPosition += event.deltaY;
        if (scrollPosition < 0) scrollPosition = 0; // Prevent negative scroll

        let maxScroll = window.innerHeight; // Set maximum scroll position based on viewport height

        // Calculate percentage scrolled
        const percentageScrolled = Math.min(scrollPosition / maxScroll, 1);

        // Update right panel position
        const leftPanel = document.getElementById('leftPanel');
        const rightPosition = -20 + (20 * percentageScrolled);
        leftPanel.style.right = `${rightPosition}vw`;

        // Update primate image location
        let primatePhoto = document.getElementById("primatePhoto");
        // let percentageMultiplier = 35 + percentageScrolled;
        let percentageMultiplier = 25 + percentageScrolled;
        let amount = 'translateX(-' + percentageMultiplier + '%)'
        primatePhoto.style.transform = amount;

        // Update text
        let topText = document.getElementById('topText');
        let overlayText = document.getElementById('overlayText')

        document.getElementById('primatePhoto')?.classList.add('revealed');

        topText.classList.add('top-minimized');
        overlayText.classList.add('overlay-minimized');

        // Check if panel is fully revealed
        if (percentageScrolled >= 1) {
            panelRevealed = true; // Panel is now fully revealed
        }
    }, { passive: false }); // Use passive: false to enable event.preventDefault()
});