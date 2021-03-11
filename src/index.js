let now = new Date();
let currentDateandTime = document.querySelector("#day-time");
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`,
];
let day = days[now.getDay()];
let hours = now.getHours();

let minutes = now.getMinutes();
currentDateandTime.innerHTML = `${day} ${hours}:${minutes}`;

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function search(event) {
  event.preventDefault();
  let apiKey = "eadddec13a962cb9c3c421b81823ffb8";
  let city = document.querySelector("#city");
  let searchInput = document.querySelector("#search-text-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  city.innerHTML = `${searchInput.value}`;

  axios.get(apiUrl).then(displayWeather);
}

function searchLocation(position) {
  let apiKey = "eadddec13a962cb9c3c421b81823ffb8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentlocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let currentLocationbutton = document.querySelector("#current-location-button");
currentLocationbutton.addEventListener("click", getCurrentlocation);


function displayFahrenheitTemperature(event){
  event.preventDefault();
  alert("Link clicked");
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
