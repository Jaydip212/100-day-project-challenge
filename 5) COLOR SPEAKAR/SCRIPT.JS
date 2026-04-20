const speaker = document.getElementById('speaker');
const colorButton = document.getElementById('colorButton');

const colors = ['#3498db', '#e74c3c', '#9b59b6', '#2ecc71', '#f1c40f', '#e67e22'];

let currentColorIndex = 0;

colorButton.addEventListener('click', () => {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    speaker.style.backgroundColor = colors[currentColorIndex];
    speaker.style.setProperty('--speaker-color', colors[currentColorIndex]);
});