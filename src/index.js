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

function formatHours (timestamp){
  return `${hours}:${minutes}`;

}

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

    celsiusTemperature = response.data.main.temp;
    let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
    iconElement.setAttribute("alt", response.data.weather[0].description);
}
   
function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
   console.log(forecast);
  forecastElement.innerHTML = `<div class="col">
        ${forecast.dt} <br />
        <img src ="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
        alt=""
        />
        <div class="weather-forecast-temperature">
          <strong>${Math.round (forecast.main.temp_max)}°</strong> ${Math.round(forecast.main.temp_min)}°
        </div>
      </div>`;
 
}

function search(event) {
  event.preventDefault();
  let apiKey = "eadddec13a962cb9c3c421b81823ffb8";
  let city = document.querySelector("#city");
  let searchInput = document.querySelector("#search-text-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  city.innerHTML = `${searchInput.value}`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  
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
   celsiusLink.classList.remove("active");
   fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active")
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let celsiusTemperature = null;
