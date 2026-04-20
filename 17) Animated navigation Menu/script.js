document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!navMenu.contains(event.target) && event.target !== menuToggle) {
            navMenu.classList.remove("active");
        }
    });
});


// jaydip_0113_official 