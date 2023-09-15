const apiKey = "952aa5657ad89f05ac2ffcc04d026386";

// Define the base API URL for weather data
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Get the HTML element with class "search" and the input field within it
const searchBox = document.querySelector(".search input");

const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

// Define an asynchronous function (background) to check the weather for a given city
async function checkWeather(city) {
  // Send a request to the OpenWeatherMap API using the specified API key and city
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  // Check if the response status is 404 (City not found)
  if (response.status == 404) {
    // Display an error message and hide the weather information
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    // If the response is successful, parse the JSON data
    var data = await response.json();

    // Update the HTML elements with weather information
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + " °C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

    // Set the weather icon based on the weather condition
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "weatherIMg/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "weatherIMg/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "weatherIMg/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "weatherIMg/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "weatherIMg/mist.png";
    }

    // Display the weather information and hide the error message
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Add an event listener to the search button
searchBtn.addEventListener("click", () => {
  // Call the checkWeather function with the value entered in the search input
  checkWeather(searchBox.value);
});
