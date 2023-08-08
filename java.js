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
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#hum").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#icon").setAttribute("src", 'https://openweathermap.org/img/wn/10d@2x.png');
  }

// function from Cel to Fah //
function convertToFah(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 21;
  }
  
  let fahConversion = document.querySelector("#fah-conversion");
  fahConversion.addEventListener("click", convertToFah);
  
  // function from Fah to Cel //
  function convertToCel(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
  }
  
  let celConversion = document.querySelector("#cel-conversion");
  celConversion.addEventListener("click", convertToCel);

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



