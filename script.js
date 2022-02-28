const axios = require("axios");

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
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemp);
}

// step 3 show weather for location
function showTemp(response) {
  console.log(response.data.main.temp);
  console.log(response.data.name);
  let displayName = document.querySelector("h1");
  displayName.innerHTML = response.data.name;
  let displayTemp = document.getElementById("temp");
  let temperature = response.data.main.temp;
  displayTemp.innerHTML = Math.round(temperature);
  let humidity = document.getElementById("humidity");
  humidity.innerHTML = `Humidity: ` + response.data.main.humidity;
  let windDisplay = document.getElementById("windPop");
  windDisplay.innerHTML = `Wind: ` + Math.round(response.data.wind.speed);
}

function getCityWeather(city) {
  let apiKey = `9130c6c3f81e5410c4080fc310e5279d`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

// function changeTemp() {
//   let celcTemp = document.getElementById("temp");
//   console.log(celcTemp.innerText);
//   let celciusToFarenheit = Math.round(celcTemp.innerText * 1.8) + 32;
//   celcTemp.innerHTML = celciusToFarenheit;
// }

// let farehneitTemp = document.getElementById("farehneit");
// farehneitTemp.addEventListener("click", changeTemp);

// function changeBack() {
//   let celcTemp = document.getElementById("temp");
//   let farehneitToCelsius = Math.round((celcTemp.innerText - 32) / 1.8);
//   celcTemp.innerHTML = farehneitToCelsius;
// }

// let cTemp = document.getElementById("celcius");
// cTemp.addEventListener("click", changeBack);
//
