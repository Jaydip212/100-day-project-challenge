// API Key for OpenWeatherMap
const API_KEY = 'yOUR aPI kEY'; // Replace with your actual API key

// DOM Elements
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
const cityName = document.querySelector('.city-name');
const date = document.querySelector('.date');
const tempValue = document.querySelector('.temp-value');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const pressure = document.querySelector('.pressure');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const feelsLike = document.querySelector('.feels-like');
const precipitation = document.querySelector('.precipitation');
const cloudCover = document.querySelector('.cloud-cover');
const weatherIcon = document.querySelector('.icon');
const forecastCards = document.querySelector('.forecast-cards');

// Weather icon mapping
const weatherIcons = {
    '01d': 'wi-day-sunny',
    '01n': 'wi-night-clear',
    '02d': 'wi-day-cloudy',
    '02n': 'wi-night-cloudy',
    '03d': 'wi-cloud',
    '03n': 'wi-cloud',
    '04d': 'wi-cloudy',
    '04n': 'wi-cloudy',
    '09d': 'wi-showers',
    '09n': 'wi-showers',
    '10d': 'wi-day-rain',
    '10n': 'wi-night-rain',
    '11d': 'wi-thunderstorm',
    '11n': 'wi-thunderstorm',
    '13d': 'wi-snow',
    '13n': 'wi-snow',
    '50d': 'wi-fog',
    '50n': 'wi-fog'
};

// Current date
const currentDate = new Date();
date.textContent = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

// Helper function to convert timestamp to time
function convertTimestampToTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Fetch weather data
async function fetchWeatherData(city) {
    try {
        // Current weather
        const currentWeatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const currentWeatherData = await currentWeatherResponse.json();

        // 5-day forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
        );
        const forecastData = await forecastResponse.json();

        updateCurrentWeather(currentWeatherData);
        updateForecast(forecastData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}

// Update current weather display
function updateCurrentWeather(data) {
    cityName.textContent = data.name;
    tempValue.textContent = Math.round(data.main.temp);
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    pressure.textContent = `${data.main.pressure} hPa`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    cloudCover.textContent = `${data.clouds.all}%`;
    
    // Update sunrise and sunset times
    sunrise.textContent = convertTimestampToTime(data.sys.sunrise);
    sunset.textContent = convertTimestampToTime(data.sys.sunset);
    
    // Update weather icon
    const iconCode = data.weather[0].icon;
    const iconClass = weatherIcons[iconCode] || 'wi-day-sunny';
    weatherIcon.className = `wi ${iconClass}`;
}

// Update forecast display
function updateForecast(data) {
    forecastCards.innerHTML = '';
    
    // Get daily forecasts (every 8th item in the list as the API returns 3-hour intervals)
    const dailyForecasts = data.list.filter((item, index) => index % 8 === 0).slice(0, 5);

    dailyForecasts.forEach(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        const dayName = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
        
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        const iconCode = forecast.weather[0].icon;
        const iconClass = weatherIcons[iconCode] || 'wi-day-sunny';
        
        card.innerHTML = `
            <h4>${dayName}</h4>
            <i class="wi ${iconClass}"></i>
            <p>${Math.round(forecast.main.temp)}°C</p>
            <p>${forecast.weather[0].description}</p>
        `;
        
        forecastCards.appendChild(card);
    });
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            fetchWeatherData(city);
        }
    }
});

// Initial load with default city
fetchWeatherData('London'); 