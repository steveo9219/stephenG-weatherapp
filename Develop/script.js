var button = document.getElementById("button");
var cityHeader = document.getElementById("city-header");
var tempHeader = document.getElementById("temperature-header");
var humidHeader = document.getElementById("humidity-header");
var windHeader = document.getElementById("windspeed-header");
var uvHeader = document.getElementById("uvindex-header");
var uvColor = document.getElementsByClassName("uvColor");
var cityForm = document.forms["city"];
var cities = document.getElementById("cities");
let cityValue;

//arrays for old cityNames and cityNames
var oldCityNames = [];
var cityNames = [];
console.log(cityNames);
//
//

var uvColor = document.getElementById("uvindex-header");

if (localStorage.getItem("cityNames")) {
  var oldCityNames = localStorage.getItem("cityNames");
  oldCityNames = oldCityNames.split(",");

  console.log(oldCityNames);
  //PT2. and here i want it to populate from the array cityNames but its just the one city in there, also it should
  //be making DIVs from the forloop below
  for (var i = 0; i < oldCityNames.length; i++) {
    var newLink = document.createElement("div");
    newLink.innerHTML = oldCityNames[i];
    cities.appendChild(newLink);
    //$("#cities").html(`<div> ${oldCityNames} </div>`);
  }
  //cities.create(`${oldCityNames[i]}\n`);
}

cityForm.addEventListener("submit", function (e) {
  e.preventDefault();
  cityValue = cityForm.querySelector("input[type=text]").value;
  cityNames.push(cityValue);
  // PT1. after i click the Submit button, it overwrites my previous city value
  localStorage.setItem("cityNames", cityNames);
  localStorage.setItem("oldCityNames", oldCityNames);

  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=007d67029ca5f1a5a6080f1d55b8a14f`;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $("#city-header").html(response.name);
    var tempF = (response.main.temp - 273.15) * 1.8 + 32;
    $("#temperature-header").text(tempF.toFixed(2) + " F");
    $("#humidity-header").text(response.main.humidity + "%");
    $("#windspeed-header").text(response.wind.speed);
    var latCord = response.coord.lat;
    var lonCord = response.coord.lon;

    var queryUvUrl = `http://api.openweathermap.org/data/2.5/uvi?appid=007d67029ca5f1a5a6080f1d55b8a14f&lat=${latCord}&lon=${lonCord}`;
    $.ajax({
      url: queryUvUrl,
      method: "GET",
    }).then(function (response) {
      $("#uvindex-header").text(response.value);
      if (response.value >= 0 && response.value <= 2) {
        uvColor.classList.add("uvGreen");
      } else if (response.value >= 3 && response.value <= 5) {
        uvColor.classList.add("uvYellow");
      } else if (response.value >= 6 && response.value <= 7) {
        uvColor.classList.add("uvOrange");
      } else if (response.value >= 8 && response.value <= 10) {
        uvColor.classList.add("uvRed");
      }
    });
  });
  // $.ajax({
  //   url: queryUvUrl,
  //   method: "GET",
  // }).then(function (response) {
  //   console.log(response);
  // });
});
//var city;
