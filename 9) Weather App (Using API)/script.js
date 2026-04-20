async function getWeather() {
    const apiKey = "39a591e070736dccbbcdf3fc3ed8828d"; // OpenWeatherMap API Key
    const city = document.getElementById("city").value;
    
    if (city.trim() === "") {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric;`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById("weatherResult").innerHTML = "City not found!";
        } else {
            document.getElementById("weatherResult").innerHTML = `
                <p>🌍 Location: ${data.name}, ${data.sys.country}</p>
                <p>🌡 Temperature: ${data.main.temp}°C</p>
                <p>☁ Condition: ${data.weather[0].description}</p>
            `;
        }
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = "Error fetching weather data!";
    }
}