var button = document.getElementById("button");
var cityHeader = document.getElementById("city-header");
var tempHeader = document.getElementById("temperature-header");
var humidHeader = document.getElementById("humidity-header");
var windHeader = document.getElementById("windspeed-header");
var uvHeader = document.getElementById("uvindex-header");
var cityForm = document.forms["city"];
var cities = document.getElementById("cities");
let cityValue;

var cityNames = [];
console.log(cityNames);
if (localStorage.getItem("cityNames")) {
  var oldCityNames = localStorage.getItem("cityNames");
  oldCityNames = oldCityNames.split(",");

  console.log(oldCityNames);
  //PT2. and here i want it to populate from the array cityNames but its just the one city in there, also it should
  //be making DIVs from the forloop below
  for (var i = 0; i < oldCityNames.length; i++) {
    $("#cities").html(`<div> ${oldCityNames} </div>`);
  }
  //cities.create(`${oldCityNames[i]}\n`);
}

cityForm.addEventListener("submit", function (e) {
  e.preventDefault();
  cityValue = cityForm.querySelector("input[type=text]").value;
  cityNames.push(cityValue);
  // PT1. after i click the Submit button, it overwrites my previous city value
  localStorage.setItem("cityNames", cityNames);

  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=007d67029ca5f1a5a6080f1d55b8a14f`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {});
});
//var city;
