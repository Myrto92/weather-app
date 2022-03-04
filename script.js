function currentDay() {
  let today = document.querySelector("#today");
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[now.getDay()];
  let time = now.getHours();
  if (time < 10) {
    time = `0 ${time}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  today.innerHTML = `${day} ${time}:${minutes}`;
}

currentDay();

function displayCity(event) {
  event.preventDefault();
  let inputText = document.getElementById("myCity");
  //alert(inputText);
  let heading = document.querySelector("h1");
  let myCity = inputText.value;
  if (myCity !== "") {
    heading.innerHTML = myCity;
    getCityWeather(myCity);
  } else {
    alert("Please type a city");
  }
}

let searchForm = document.getElementById("searchButton");
searchForm.addEventListener("click", displayCity);

let locationButton = document.getElementById("currentLocation");
locationButton.addEventListener("click", getPosition);

// step 1 get location
function getPosition(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(getTemp);
}

// step 2 get weather for location
function getTemp(position) {
  console.log(position);
  let longtitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let unit = "metric";
  let apiKey = `9130c6c3f81e5410c4080fc310e5279d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longtitude}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemp);
}

// step 3 show weather for location
function showTemp(response) {
  celsiusTemperature = response.data.main.temp;
  let displayName = document.querySelector("h1");
  displayName.innerHTML = response.data.name;
  let displayTemp = document.getElementById("temp");
  let temperature = celsiusTemperature;
  displayTemp.innerHTML = Math.round(temperature);
  let humidity = document.getElementById("humidity");
  humidity.innerHTML = `Humidity: ` + response.data.main.humidity + `%`;
  let windDisplay = document.getElementById("windPop");
  windDisplay.innerHTML =
    `Wind: ` + Math.round(response.data.wind.speed) + `km/H`;
  let displayIcon = document.querySelector("#iconFirst");
  displayIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  displayIcon.setAttribute("alt", response.data.weather[0].description);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  getForecast(response.data.coord);
}

function getCityWeather(city) {
  let apiKey = `9130c6c3f81e5410c4080fc310e5279d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

getCityWeather("Athens");

function getForecast(coordinates) {
  let apiKey = `9130c6c3f81e5410c4080fc310e5279d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sund", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  return days[day];
}

function displayForecast(response) {
  // console.log(forecast.data.daily);
  console.log(response);
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-4">
    <div class="days">${formatDay(forecastDay.dt)}</div>
      <img 
      src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png"
      alt=""
      width="40"
      />       
      <div 
        class="forecast-max">${Math.round(forecastDay.temp.max)}°<span 
        class="forecast-min">${Math.round(forecastDay.temp.min)}°</span>
    </div>
</div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
