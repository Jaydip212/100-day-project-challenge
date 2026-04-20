// Typewriter Animation for hacker roles
const rolesText = [
    "Cyber Security Expert @_",
    "Ethical Hacker //root",
    "Web Developer <js/>",
    "Kali Linux Specialist",
    "Animation Freak !"
];
let current = 0;
let rolesDiv = document.getElementById('roles');
function showRole() {
    rolesDiv.classList.remove('typewriter');
    setTimeout(() => {
        rolesDiv.textContent = rolesText[current];
        rolesDiv.classList.add('typewriter');
        current = (current + 1) % rolesText.length;
    }, 210);
}
showRole();
setInterval(showRole, 2400);

// Matrix effect (optional): only for visuals! (Can remove if heavy)
const matrixBG = document.querySelector('.matrix-bg');
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'fixed';
canvas.style.top = '0'; canvas.style.left = '0';
canvas.style.zIndex = '1';
canvas.style.pointerEvents = 'none';

matrixBG.appendChild(canvas);

const ctx = canvas.getContext('2d');
const cols = Math.floor(window.innerWidth / 18);
const ypos = Array(cols).fill(0);

function matrix() {
    ctx.fillStyle = '#0d151458';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = '16px Fira Mono, monospace';
    ctx.fillStyle = '#27ff70';
    for (let i = 0; i < cols; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, i * 18, ypos[i] * 18);
        if (Math.random() > 0.979) ypos[i] = 0;
        else ypos[i]++;
    }
}
setInterval(matrix, 51);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


