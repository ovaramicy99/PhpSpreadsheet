document.addEventListener('DOMContentLoaded', function() {
    const mobileFullscreenGIF = document.getElementById('mobile-fullscreen-gif');
    const closeButton = document.querySelector('.close-btn'); // Target the close button

    // Check if the elements are found
    if (!mobileFullscreenGIF || !closeButton) {
        console.error("Element not found: mobileFullscreenGIF or closeButton is missing.");
        return; // Stop further execution if elements aren't found
    }

    function checkScreenSize() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            mobileFullscreenGIF.classList.remove('hidden');
        } else {
            mobileFullscreenGIF.classList.add('hidden');
        }
    }

    // Run the check on page load
    checkScreenSize();

    // Run the check on window resize
    window.addEventListener('resize', checkScreenSize);

    // Ensure the close button hides the popup
    closeButton.addEventListener('click', function() {
        console.log("Close button clicked"); // Debugging message to confirm the event triggers
        mobileFullscreenGIF.classList.add('hidden');
    });
});
