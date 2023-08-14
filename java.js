// Today's date on main screen//

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  let dateNumber = date.getDate();

  let monthIndex = date.getMonth();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  let month = months[monthIndex];

  return `${day}, ${month} ${dateNumber} | ${hours}:${minutes}`;
}

// function to search for specific day & date //
function getForecastDay(day) {
  let apiKey = "200963c15c1efe0974c1ad82c30a1e8a";
  let apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showForecastDay);  
  }

  function showForecastDay (response) {
    document.querySelector("#dayWeek").innerHTML = response.data.temp.day;
  }

  function getForecastDate (date) {
    let apiKey = "200963c15c1efe0974c1ad82c30a1e8a";
    let apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(showForecastDate);  
    }

  function showForecastDate (response) {
    document.querySelector("#dateWeek").innerHTML = response.data.dt;
  }

// function to search for specific city //
function searchCity(city) { 
  let apiKey = "200963c15c1efe0974c1ad82c30a1e8a";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeather);  

  }

  // function to search for city //
function handleSubmit(event) {
  event.preventDefault() 
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  }

  function searchLocation(position) {
  let apiKey = "200963c15c1efe0974c1ad82c30a1e8a";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`; 
  axios.get(apiURL).then(showWeather);  
  }

  // function for current position //
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  }

  // showWeather //
  function showWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    let celsiusTemperature = response.data.main.temp;
    let minTemp = Math.round(response.data.main.temp_min);
    let maxTemp = Math.round(response.data.main.temp_max);
    let descriptionText = response.data.weather[0].description;
    document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
    document.querySelector("#description").innerHTML = `It is a day filled with ${descriptionText} & a minimum temperature of ${minTemp} and a maximum of ${maxTemp}. Enjoy!`;
    document.querySelector("#hum").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#icon").setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#icon").setAttribute(
      "alt", response.data.weather[0].description);
    iconElement.setAttribute();

    }
// calculate date //
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// push through search //
let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);
  
// find current location //
let currentLocationButton = document.querySelector("#current-position");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");

// Get slider to do something //
function updateTemperatureUnits() {
  let temperatureElement = document.querySelector("#temperature");
  let unitToggle = document.querySelector(".switch-control-input");
  let temperatureUnitsElement = document.querySelector(".temperatureUnits");
  let windElement = document.querySelector("#wind");
  let windUnitElement = document.querySelector(".windUnit");
  
  let minTempElement = document.querySelector("#minTemp");
  let maxTempElement = document.querySelector("#maxTemp");

  if (unitToggle.checked) {
    // Celsius to Fahrenheit conversion
    let celsiusTemperature = parseFloat(temperatureElement.textContent);
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.textContent = Math.round(fahrenheitTemperature);
    temperatureUnitsElement.innerHTML = "&deg;F";

    let windCelsius = parseFloat(windElement.textContent);
    let windFahrenheit = (windCelsius * 0.621371);
    windElement.textContent = Math.round(windFahrenheit);
    windUnitElement.innerHTML = "m/h";

    let minCelsiusTemperature = parseFloat(minTempElement.textContent);
    let maxCelsiusTemperature = parseFloat(maxTempElement.textContent);
    let minFahrenheitTemperature = (minCelsiusTemperature * 9) / 5 + 32;
    let maxFahrenheitTemperature = (maxCelsiusTemperature * 9) / 5 + 32;
    minTempElement.textContent = Math.round(minFahrenheitTemperature);
    maxTempElement.textContent = Math.round(maxFahrenheitTemperature);
  } else {
    // Fahrenheit to Celsius conversion
    let fahrenheitTemperature = parseFloat(temperatureElement.textContent);
    let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
    temperatureElement.textContent = Math.round(celsiusTemperature);
    temperatureUnitsElement.innerHTML = "&deg;C";

    let windFahrenheit = parseFloat(windElement.textContent);
    let windCelsius = windFahrenheit / 0.621371;
    windElement.textContent = Math.round(windCelsius);
    windUnitElement.innerHTML = "km/h";

    let minFahrenheitTemperature = parseFloat(minTempElement.textContent);
    let maxFahrenheitTemperature = parseFloat(maxTempElement.textContent);
    let minCelsiusTemperature = ((minFahrenheitTemperature - 32) * 5) / 9;
    let maxCelsiusTemperature = ((maxFahrenheitTemperature - 32) * 5) / 9;
    minTempElement.textContent = Math.round(minCelsiusTemperature);
    maxTempElement.textContent = Math.round(maxCelsiusTemperature);
  }
}


var unitToggle = document.querySelector(".switch-control-input");
unitToggle.addEventListener("change", updateTemperatureUnits);
