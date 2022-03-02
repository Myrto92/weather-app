function currentDay() {
  let today = document.querySelector("#today");
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
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

//change to Fahrehnheit

function changeTemp(event) {
  event.preventDefault();
  let temperatureElement = document.getElementById("temp");
  farehneitTemp.classList.add("active");
  cTemp.classList.remove("active");
  let celciusToFarenheit = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(celciusToFarenheit);
}

let celciusTemperature = null;

let farehneitTemp = document.getElementById("farehneit");
farehneitTemp.addEventListener("click", changeTemp);

function changeBack(event) {
  event.preventDefault();
  farehneitTemp.classList.remove("active");
  cTemp.classList.add("active");
  let celcTemp = document.getElementById("temp");
  let farehneitToCelsius = Math.round(celsiusTemperature);
  celcTemp.innerHTML = farehneitToCelsius;
}

let cTemp = document.getElementById("celcius");
cTemp.addEventListener("click", changeBack); //

getCityWeather("Athens");

function getForecast(coordinates) {
  let apiKey = `9130c6c3f81e5410c4080fc310e5279d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  let days = ["Monday", "Thuesday", "Wednesday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-4">
    <div class="days">${day}</div>
      <i class="fas fa-sun" id="icons"></i>
        <div 
        class="forecast-max">18°<span 
        class="forecast-min">12°</span>
    </div>
</div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();
