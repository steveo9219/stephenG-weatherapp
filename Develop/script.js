var button = document.getElementById("button");
var cityHeader = document.getElementById("city-header");
var tempHeader = document.getElementById("temperature-header");
var humidHeader = document.getElementById("humidity-header");
var windHeader = document.getElementById("windspeed-header");
var uvHeader = document.getElementById("uvindex-header");
const cityForm = document.forms["city"];
var cities = document.getElementById("cities");
let cityValue;

var cityNames = [];

if (localStorage.getItem("cityNames")) {
  var oldCityNames = localStorage.getItem("cityNames");
  oldCityNames = oldCityNames.split(",");
  console.log(oldCityNames);
  for (var i = 0; i < oldCityNames.length; i++) var city;
  var oldCityNames = document.createElement("div");
  cityValue.appendChild = newLink;
  newLink.innerHTML = oldCityNames[i];
  //$("#cities").html(`<div> ${oldCityNames} </div>`);

  //cities.create(`${oldCityNames[i]}\n`);
  console.log(oldCityNames[i]);
}

cityForm.addEventListener("submit", function (e) {
  e.preventDefault();
  cityValue = cityForm.querySelector("input[type=text]").value;
  cityNames.push(cityValue);
  localStorage.setItem("cityNames", cityNames);
  // Here we are building the URL we need to query the database
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=007d67029ca5f1a5a6080f1d55b8a14f`;

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Log the queryURL
    // Log the resulting object
  });
});

//main class
