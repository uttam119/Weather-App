

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const city = params.get("city");
    

    if (city) {
        getWeather(city);
    } else {
        console.error('City not provided in query parameter');
       
        displayError("City not provided in query parameter");
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();
        console.log(data)

        if (response.ok) {
            updateUI(data);
            document.querySelector(".container").style.display = "block";
            
            document.querySelector(".desc").textContent=`Weather Detail of ${city}`;
        } else {
            throw new Error(data.message || "Unknown error");
        }
    }
    
    catch (error) {
        console.error('Error fetching weather data:', error);
        displayError(`Error fetching weather data:\nCity ${city} not found\nPlease check the city name and try again.`);
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
    // errorDiv.style.display = "none";
}

function displayError(message) {
    const errorElement = document.querySelector(".errorgot");
    errorElement.querySelector(".error-message").textContent = message;
    // errorElement.classList.remove("hidden");
    errorElement.style.display = "block";
    const errorMessageElement = errorElement.querySelector(".error-message");
    errorMessageElement.innerHTML = message.replace(/\n/g, "<br>");  

}
// function displayError(message) {
//     const errorContainer = document.querySelector('.errorgot');
//     errorContainer.style.display = 'block'; // Display the error container
// }

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
