var button = document.getElementById("button");
var cityHeader = document.getElementById("city-header");
var tempHeader = document.getElementById("temperature-header");
var humidHeader = document.getElementById("humidity-header");
var windHeader = document.getElementById("windspeed-header");
var uvHeader = document.getElementById("uvindex-header");
const cityForm = document.forms["city"];

cityForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const cityValue = cityForm.querySelector("input[type=text]").value;
  console.log(cityValue);
});

console.log(cityValue);

// Here we are building the URL we need to query the database
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?" +
  cityValue +
  "&appid=007d67029ca5f1a5a6080f1d55b8a14f";

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET",
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function (response) {
    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);
  });
