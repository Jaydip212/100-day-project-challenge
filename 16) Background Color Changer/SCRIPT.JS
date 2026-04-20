document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("changeColor");
    const colorCode = document.getElementById("colorCode");

    // Load saved background color
    const savedColor = localStorage.getItem("bgColor");
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
        colorCode.textContent = savedColor;
    }

    button.addEventListener("click", () => {
        const randomColor = getRandomColor();
        document.body.style.backgroundColor = randomColor;
        colorCode.textContent = randomColor;
        
        // Save color in local storage
        localStorage.setItem("bgColor", randomColor);
    });
});

// Function to generate a random hex color
function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}