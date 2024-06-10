function refreshWeather(reponse) {
  console.log(reponse.data);
}

function searchCity(city) {
  let apiKey = "208923ot246cf9a44e16fa303a8c757b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();

  console.log("Form submitted");

  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");

  if (searchInput && cityElement) {
    let searchValue = searchInput.value.trim();
    console.log("Search value:", searchValue);
    if (searchValue) {
      cityElement.innerHTML = searchValue;
    } else {
      cityElement.innerHTML = "Please enter a city name.";
    }
  } else {
    console.error("Required elements are missing in the HTML.");
  }
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
if (searchFormElement) {
  searchFormElement.addEventListener("submit", handleSearchSubmit);
  console.log("Event listener added to form");
} else {
  console.error("Search form element is missing in the HTML.");
}
