// script.js
const searchInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorDiv = document.querySelector(".error");

searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeather(city);
        errorDiv.style.display = "none";
    } else {
        errorDiv.style.display = "block";
        console.error('Please enter a valid city name');
        // Handle error
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();
        
        if (response.ok) {
            // Update UI with weather data
            updateUI(data);
        } else {
            console.error('Error fetching weather data:', data.error);
            // Handle error
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Handle error
    }
}

function updateUI(data) {
    const weatherData = data.weather;
    const timeZoneData = data.timeZone;

    document.querySelector(".city").textContent = weatherData.name;
    document.querySelector(".temp").textContent = Math.round(weatherData.main.temp) + "°C";
    document.querySelector(".humidity").textContent = weatherData.main.humidity + "%";
    document.querySelector(".wind").textContent = weatherData.wind.speed + " km/h";
    document.querySelector(".time").textContent = timeZoneData.formatted;
    document.querySelector(".dateshow").textContent = timeZoneData.formattedDate;

    const weatherIcon = document.querySelector(".weather-icon");
    if (weatherData.weather[0].main === "Clouds") {
        weatherIcon.src = "./images/clouds.png";
    } else if (weatherData.weather[0].main === "Clear") {
        weatherIcon.src = "./images/clear.png";
    } else if (weatherData.weather[0].main === "Rain") {
        weatherIcon.src = "./images/rain.png";
    } else if (weatherData.weather[0].main === "Drizzle") {
        weatherIcon.src = "./images/drizzle.png";
    } else if (weatherData.weather[0].main === "Mist") {
        weatherIcon.src = "./images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}
