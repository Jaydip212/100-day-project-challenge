// Matrix Background Effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width/fontSize;

const rainDrops = [];

for( let x = 0; x < columns; x++ ) {
    rainDrops[x] = 1;
}

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for(let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i*fontSize, rainDrops[i]*fontSize);
        
        if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
}

setInterval(draw, 30);

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / height) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// Typing Effect
const phrases = [
    "Jaydip | Cybersecurity Expert ",
    "Ethical Hacker ",
    "Web Developer ",
    "Security Researcher ",
    "Bug Hunter "
];

let phraseIndex = 0;
let letterIndex = 0;
let currentPhrase = "";
let isDeleting = false;
let isEnd = false;

function type() {
    isEnd = false;
    const typedTextElement = document.getElementById("typed-text");
    
    currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentPhrase.substring(0, letterIndex - 1);
        letterIndex--;
    } else {
        typedTextElement.textContent = currentPhrase.substring(0, letterIndex + 1);
        letterIndex++;
    }
    
    if (!isDeleting && letterIndex === currentPhrase.length) {
        isEnd = true;
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && letterIndex === 0) {
        isDeleting = false;
        phraseIndex++;
        if (phraseIndex === phrases.length) {
            phraseIndex = 0;
        }
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

// Start typing effect
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(type, 1000);
});

// Theme Switcher
const themeSwitch = document.querySelector('.theme-switch');
const body = document.body;

themeSwitch.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const icon = themeSwitch.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Form Submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Project Image Modal
const projectImages = document.querySelectorAll('.project-card img');

projectImages.forEach(image => {
    image.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        const modalImg = document.createElement('img');
        modalImg.src = image.src;
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', () => {
            modal.remove();
        });
    });
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-category, .project-card, .cert-card').forEach(el => {
    observer.observe(el);
});

// Skill Bar Animation
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItem = entry.target;
                const level = skillItem.dataset.level + '%';
                const skillLevel = skillItem.querySelector('.skill-level');
                skillLevel.style.width = level;
                skillItem.classList.add('animate');
                observer.unobserve(skillItem);
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize skill bars when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initSkillBars();
});

// Window Resize Handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
