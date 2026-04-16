const apiKey = "75a4b76b041751fc58dab2802ebbfe3d";

// Show Date & Time
function updateDateTime() {
    const now = new Date();
    document.getElementById("dateTime").innerHTML =
        now.toLocaleString();
}
setInterval(updateDateTime, 1000);

// Get Weather by City
async function getWeather() {
    const city = document.getElementById("city").value;
    fetchWeather(`q=${city}`);
}

// Get Weather by Location
function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeather(`lat=${lat}&lon=${lon}`);
    });
}

// Fetch Weather Data
async function fetchWeather(query) {
    const url = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
        document.getElementById("weatherResult").innerHTML = "Error fetching data";
        return;
    }

    const temp = data.main.temp;
    const weather = data.weather[0].main;
    const icon = data.weather[0].icon;
    const city = data.name;

    // Weather Icon
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // Background Change
    changeBackground(weather);

    document.getElementById("weatherResult").innerHTML = `
        <h2>${city}</h2>
        <img src="${iconUrl}">
        <p>${weather}</p>
        <p>🌡️ ${temp} °C</p>
    `;
}

// Change Background Based on Weather
function changeBackground(weather) {
    if (weather.includes("Cloud")) {
        document.body.style.background = "#757F9A";
    } else if (weather.includes("Rain")) {
        document.body.style.background = "#4B79A1";
    } else if (weather.includes("Clear")) {
        document.body.style.background = "#f7b733";
    } else if (weather.includes("Snow")) {
        document.body.style.background = "#83a4d4";
    } else {
        document.body.style.background = "#2193b0";
    }
}