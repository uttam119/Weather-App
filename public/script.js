// // script.js
// const searchInput = document.getElementById("cityInput");
// const searchBtn = document.getElementById("searchBtn");
// const errorDiv = document.querySelector(".error");

// searchBtn.addEventListener("click", () => {
//     const city = searchInput.value.trim();
//     if (city) {
//         getWeather(city);

//         errorDiv.style.display = "none";
//     } else {
//         errorDiv.style.display = "block";
//         console.error('Please enter a valid city name');
//         // Handle error
//     }
// });

// async function getWeather(city) {
//     try {
//         const response = await fetch(`/weather?city=${city}`);
//         const data = await response.json();
        
//         if (response.ok) {
//             // Update UI with weather data
//             updateUI(data);
//         } else {
          
//             console.error('Error fetching weather data:', data.error);
//             // Handle error
//         }
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//         // Handle error
//     }
// }

// function updateUI(data) {
//     const weatherData = data.weather;
//     const timeZoneData = data.timeZone;

//     document.querySelector(".city").textContent = weatherData.name;
//     document.querySelector(".temp").textContent = Math.round(weatherData.main.temp) + "°C";
//     document.querySelector(".humidity").textContent = weatherData.main.humidity + "%";
//     document.querySelector(".wind").textContent = weatherData.wind.speed + " km/h";
//     document.querySelector(".time").textContent = timeZoneData.formatted;
//     document.querySelector(".dateshow").textContent = timeZoneData.formattedDate;

//     const weatherIcon = document.querySelector(".weather-icon");
//     if (weatherData.weather[0].main === "Clouds") {
//         weatherIcon.src = "./images/clouds.png";
//     } else if (weatherData.weather[0].main === "Clear") {
//         weatherIcon.src = "./images/clear.png";
//     } else if (weatherData.weather[0].main === "Rain") {
//         weatherIcon.src = "./images/rain.png";
//     } else if (weatherData.weather[0].main === "Drizzle") {
//         weatherIcon.src = "./images/drizzle.png";
//     } else if (weatherData.weather[0].main === "Mist") {
//         weatherIcon.src = "./images/mist.png";
//     }

//     document.querySelector(".weather").style.display = "block";
//     document.querySelector(".error").style.display = "none";
// }







const searchInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorDiv = document.querySelector(".error");
const card = document.querySelector(".Card");
const container = document.querySelector(".container");

searchBtn.addEventListener("click", async () => {
    const city = searchInput.value.trim();
    if (city) {
        try {
            await getWeather(city);
            errorDiv.style.display = "none";
        } catch (error) {
            if (error.message === "City not found") {
                errorDiv.textContent = "Invalid city name";
            } else {
                errorDiv.textContent = "Please enter a correct city name";
            }
            errorDiv.style.display = "block";
            // resetUI();
            console.error('Error fetching weather data:', error);
            // Hide error message after 5 seconds
            // setTimeout(() => {
            //     errorDiv.style.display = "none";
            // }, 5000);
        }
    } else {
        errorDiv.textContent = "Please enter a city name";
        errorDiv.style.display = "block";
        console.error('Please enter a city name');
    }
});

async function getWeather(city) {
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();

    if (response.ok) {
        updateUI(data);
        card.style.display= "none";
        container.style.display="block"

    } else {
        throw new Error(data.error.message);
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
    errorDiv.style.display = "none";
}

function resetUI() {
    searchInput.value = ""; // Clear the search input value
    document.querySelector(".city").textContent = "";
    document.querySelector(".temp").textContent = "";
    document.querySelector(".humidity").textContent = "";
    document.querySelector(".wind").textContent = "";
    document.querySelector(".time").textContent = "";
    document.querySelector(".dateshow").textContent = "";
    document.querySelector(".weather-icon").src = "";
    document.querySelector(".weather").style.display = "none";
}



















