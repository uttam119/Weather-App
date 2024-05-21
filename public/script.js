const searchInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorDiv = document.querySelector(".error");

searchBtn.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
        
        window.location.href = `weather.html?city=${encodeURIComponent(city)}`;
        searchInput.value="";
        errorDiv.style.display = "";
    } else {
        errorDiv.textContent = "Please enter a city name";
        errorDiv.style.display = "block";
        console.error('Please enter a city name');
    }
});