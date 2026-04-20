const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save the mode in local storage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
});

// Load mode from local storage
window.onload = () => {
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark-mode");
    }
};