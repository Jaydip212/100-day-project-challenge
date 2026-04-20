const apiKey = "39a591e070736dccbbcdf3fc3ed8828d";

async function getWeather() {
    let city = document.getElementById("city").value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    let response = await fetch(url);
    let data = await response.json();

    document.getElementById("location").innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById("temp").innerText = data.main.temp;
    document.getElementById("condition").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("wind").innerText = data.wind.speed;

    let sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    let sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    document.getElementById("sunrise").innerText = sunriseTime;
    document.getElementById("sunset").innerText = sunsetTime;

    document.getElementById("weather-info").classList.remove("hidden");

    // Add Weather Animation
    let weatherCondition = data.weather[0].main.toLowerCase();
    startWeatherAnimation(weatherCondition);
}

// 🔥 Background Animation for Rain/Snow
function startWeatherAnimation(condition) {
    const canvas = document.getElementById("weatherCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    
    function createParticles() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speedY: condition.includes("rain") ? 4 : 2,
                size: condition.includes("snow") ? 4 : 2
            });
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = condition.includes("rain") ? "blue" : "white";

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            p.y += p.speedY;
            if (p.y > canvas.height) p.y = 0;
        });

        requestAnimationFrame(animateParticles);
    }

    createParticles();
    animateParticles();
}

// 🌍 Google Places Autocomplete
function initAutocomplete() {
    let input = document.getElementById("city");
    let autocomplete = new google.maps.places.Autocomplete(input);
}