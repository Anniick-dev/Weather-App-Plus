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
    document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#hum").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#icon").setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    document.querySelector("#icon").setAttribute(
      "alt", response.data.weather[0].description);
    iconElement.setAttribute();
  
    getForecast(response.data.coord)  }

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

  if (unitToggle.checked) {
    // Fahrenheit to Celsius conversion
    let fahrenheitTemperature = parseFloat(temperatureElement.textContent);
    let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
    temperatureElement.textContent = Math.round(celsiusTemperature);
  } else {
    // Celsius to Fahrenheit conversion
    let celsiusTemperature = parseFloat(temperatureElement.textContent);
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.textContent = Math.round(fahrenheitTemperature);
  }
}

var unitToggle = document.querySelector(".switch-control-input");
unitToggle.addEventListener("change", updateTemperatureUnits);
