const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city !== "") {
        getWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

// Search when Enter key is pressed
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

async function getWeather(city) {

    try {

        // Show loading message
        document.getElementById("cityName").textContent = "Loading...";
        document.getElementById("temperature").textContent = "Temperature: --";
        document.getElementById("humidity").textContent = "Humidity: --";
        document.getElementById("wind").textContent = "Wind Speed: --";
        document.getElementById("condition").textContent = "Condition: --";

        const response = await fetch(
            `https://wttr.in/${city}?format=j1`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        // Capitalize city name
        document.getElementById("cityName").textContent =
            city.charAt(0).toUpperCase() + city.slice(1);

        document.getElementById("temperature").textContent =
            `Temperature: ${data.current_condition[0].temp_C} °C`;

        document.getElementById("humidity").textContent =
            `Humidity: ${data.current_condition[0].humidity}%`;

        document.getElementById("wind").textContent =
            `Wind Speed: ${data.current_condition[0].windspeedKmph} km/h`;

        // Weather condition and emoji
        let condition =
            data.current_condition[0].weatherDesc[0].value;

        let emoji = "🌍";

        if (condition.toLowerCase().includes("sun")) {
            emoji = "☀️";
        } else if (condition.toLowerCase().includes("rain")) {
            emoji = "🌧️";
        } else if (condition.toLowerCase().includes("cloud")) {
            emoji = "☁️";
        } else if (condition.toLowerCase().includes("snow")) {
            emoji = "❄️";
        } else if (condition.toLowerCase().includes("storm")) {
            emoji = "⛈️";
        } else if (condition.toLowerCase().includes("mist") ||
                   condition.toLowerCase().includes("fog")) {
            emoji = "🌫️";
        }

        document.getElementById("condition").textContent =
            `Condition: ${condition} ${emoji}`;

    } catch (error) {

        document.getElementById("cityName").textContent = "Error";
        document.getElementById("temperature").textContent = "Temperature: --";
        document.getElementById("humidity").textContent = "Humidity: --";
        document.getElementById("wind").textContent = "Wind Speed: --";
        document.getElementById("condition").textContent = "Condition: --";

        alert("Unable to fetch weather data. Please try again.");
        console.log(error);
    }
}