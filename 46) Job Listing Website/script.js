document.addEventListener("DOMContentLoaded", function() {
    const applyButtons = document.querySelectorAll(".apply-btn");
    const searchInput = document.getElementById("search");
    const jobCards = document.querySelectorAll(".job-card");

    // Apply Button Click Event
    applyButtons.forEach(button => {
        button.addEventListener("click", function() {
            let applyUrl = this.getAttribute("data-url");
            alert("Redirecting to Job Application Form...");
            window.location.href = applyUrl;  // Redirect to Apply Page
        });
    });

    // Search Filter Functionality
    searchInput.addEventListener("keyup", function() {
        let searchValue = searchInput.value.toLowerCase();

        jobCards.forEach(card => {
            let jobTitle = card.querySelector("h3").innerText.toLowerCase();
            if (jobTitle.includes(searchValue)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});