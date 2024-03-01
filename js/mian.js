const weatherApp = document.querySelector(".weather-app");
const submitBtn = document.querySelector(".btn");
const inputCity = document.querySelector("#input-city");
const date = document.querySelector(".date span");
const citySpan = document.querySelector(".location .city");
const countrySpan = document.querySelector(".location .country");
const temp = document.querySelector(".temp span");
const tempMax = document.querySelector(".temp-max span");
const tempMin = document.querySelector(".temp-min span");
const windSpeed = document.querySelector(".wind-speed span");
const windDeg = document.querySelector(".wind-deg span");
const humidity = document.querySelector(".humidity span");
const description = document.querySelector(".description span");
const error = document.querySelector(".error");
let query = "";

// Setup Site
window.onload = () => {
  date.innerHTML = window.Date().slice(0, 16);
  submitBtn.disabled = true;
  locationCountry();
};

// simple validation
inputCity.addEventListener("keyup", (e) => {
  if (e.target.value == "") {
    submitBtn.disabled = true;
  } else {
    submitBtn.disabled = false;
  }
});

// Api
const apiKey = "a0a0b5d4f0aee8063af2aa6ce19a1e62";
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?`;

// Event
submitBtn.addEventListener("click", getData);

// Get Location Country
function locationCountry() {
  fetch("https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572")
    .then((response) => response.json())
    .then((data) => {
      inputCity.value = data.city;
      getData();
    });
}
// Get Weather Function
function getData() {
  if (inputCity.value != "") {
    fetch(`${baseUrl}q=${inputCity.value}&appid=${apiKey}`)
      .then((response) => response.json())
      .then((data) => fillData(data));
  }
}

// Change Background Image
function changeImage(weatherCondition) {
  switch (weatherCondition) {
    case "Clouds":
      weatherApp.style.backgroundImage = "url(../images/clouds.jpg)";
      break;
    case "Rian":
      weatherApp.style.backgroundImage = "url(../images/rian.webp)";
      break;
    case "Snow":
      weatherApp.style.backgroundImage = "url(../images/snow.webp)";
      break;
    case "Clear":
      weatherApp.style.backgroundImage = "url(../images/clear.jpg)";
      break;
    case "Mist":
      weatherApp.style.backgroundImage = "url(../images/mist.webp)";
      break;
    case "Haze":
      weatherApp.style.backgroundImage = "url(../images/haze.webp)";
      break;

    default:
      weatherApp.style.backgroundImage = "url(../images/default.jpg)";
      break;
  }
}

// fill data
function fillData(data) {
  if (data.cod == 200) {
    console.log(data);

    error.innerHTML = "";
    citySpan.innerHTML = data.name;
    countrySpan.innerHTML = data.sys.country;
    temp.innerHTML = data.main.temp;
    tempMax.innerHTML = data.main.temp_max;
    tempMin.innerHTML = data.main.temp_min;
    windSpeed.innerHTML = data.wind.speed;
    windDeg.innerHTML = data.wind.deg;
    humidity.innerHTML = data.main.humidity;

    description.innerHTML = data.weather[0].description;
    changeImage(data.weather[0].main);
  } else {
    error.innerHTML = data.message;
  }
}
