function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");

  let temperature = response.data.temperature.current;
  let date = new Date(response.data.time * 1000); // Assuming the API provides the time in seconds since epoch (UTC)

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-temperature-icon" />`;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  descriptionElement.innerHTML = response.data.condition.description;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;

  // Convert the UTC time to local time of the city
  let cityTime = convertToCityTime(date, response.data.timezone);
  timeElement.innerHTML = formatDate(cityTime);

  console.log(response.data);
}

function handleError(error) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = "City not found. Please try again.";
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function convertToCityTime(date, timezoneOffset) {
  // Create a new date object using the timezone offset
  let localTime = new Date(date.getTime() + timezoneOffset * 1000);
  return localTime;
}

function searchCity(city) {
  let apiKey = "208923ot246cf9a44e16fa303a8c757b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather).catch(handleError);
}

function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");

  if (searchInput && cityElement) {
    let searchValue = searchInput.value.trim();
    if (searchValue) {
      cityElement.innerHTML = searchValue;
    } else {
      cityElement.innerHTML = "Please enter a city name.";
    }
  }
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
if (searchFormElement) {
  searchFormElement.addEventListener("submit", handleSearchSubmit);
}
