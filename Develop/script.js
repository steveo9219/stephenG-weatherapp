//targeting the city and more in depth weather of the typed in location
var button = document.getElementById("button");
var cityHeader = document.getElementById("city-header");
var tempHeader = document.getElementById("temperature-header");
var humidHeader = document.getElementById("humidity-header");
var windHeader = document.getElementById("windspeed-header");
var uvHeader = document.getElementById("uvindex-header");
var uvColor = document.getElementsByClassName("uvColor");
var cityForm = document.forms["city"];
var cities = document.getElementById("cities");
//targeting the 5 day forecast here
var dayOneTemp = document.getElementById("dayOneTemp");
var dayOneDate = document.getElementById("dayOneDate");
var dayOneHumidity = document.getElementById("dayOneHumidity");
var dayTwoDate = document.getElementById("dayTwoDate");
var dayTwoTemp = document.getElementById("dayTwoTemp");
var dayTwoHumidity = document.getElementById("dayTwoHumidity");
var dayThreeDate = document.getElementById("dayThreeDate");
var dayThreeTemp = document.getElementById("dayThreeTemp");
var dayThreeHumidity = document.getElementById("dayThreeHumidity");
var dayFourDate = document.getElementById("dayFourDate");
var dayFourTemp = document.getElementById("dayFourTemp");
var dayFourHumidity = document.getElementById("dayFourHumidity");
var dayFiveDate = document.getElementById("dayFiveDate");
var dayFiveTemp = document.getElementById("dayFiveTemp");
var dayFiveHumidity = document.getElementById("dayFiveHumidity");

//
let cityValue;

//arrays for old cityNames and cityNames
var oldCityNames = [];
var cityNames = [];

//
//

var uvColor = document.getElementById("uvindex-header");
//var cityButtons = document.getElementsByClassName("cityButtons");

if (localStorage.getItem("cityNames")) {
	var oldCityNames = localStorage.getItem("cityNames");
	oldCityNames = oldCityNames.split(",");

	for (var i = 0; i < oldCityNames.length; i++) {
		var newLink = document.createElement("BUTTON");
		newLink.innerHTML = oldCityNames[i];
		cities.appendChild(newLink);
	}
}

cityForm.addEventListener("submit", function (e) {
	e.preventDefault();
	cityValue = cityForm.querySelector("input[type=text]").value;
	cityNames.push(cityValue);
	// PT1. after i click the Submit button, it overwrites my previous city value
	localStorage.setItem("cityNames", cityNames);
	localStorage.setItem("oldCityNames", oldCityNames);

	var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=007d67029ca5f1a5a6080f1d55b8a14f`;
	var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=007d67029ca5f1a5a6080f1d55b8a14f`;
	$.ajax({
		url: queryURL,
		method: "GET",
	}).then(function (response) {
		$("#city-header").html(response.name);
		var tempF = (response.main.temp - 273.15) * 1.8 + 32;
		$("#temperature-header").text(tempF.toFixed(2) + " F");
		$("#humidity-header").text(response.main.humidity + "%");
		$("#windspeed-header").text(response.wind.speed);
		uvColor.classList.add("uvYellow");
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
			} else if (response.value >= 8 && response.value <= 20) {
				uvColor.classList.add("uvRed");
			}
		});
	});
	$.ajax({
		url: fiveDayURL,
		method: "GET",
	}).then(function (response) {
		console.log(response);
		//Day 1 forecast
		$(".today").text(response.list[0].dt_txt.slice(0, 10));
		$(".dayOneDate").text(response.list[1].dt_txt.slice(0, 10));
		var tempF1 = (response.list[1].main.temp_max - 273.15) * 1.8 + 32;
		$("#dayOneTemp").text(tempF1.toFixed(2) + " F");
		$("#dayOneHumidity").text(response.list[1].main.humidity + "%");
		//Day 2 forecast
		$("#dayTwoDate").text(response.list[9].dt_txt.slice(0, 10));
		var tempF2 = (response.list[9].main.temp_max - 273.15) * 1.8 + 32;
		$("#dayTwoTemp").text(tempF2.toFixed(2) + " F");
		$("#dayTwoHumidity").text(response.list[9].main.humidity + "%");
		//Day 3 forecast
		$("#dayThreeDate").text(response.list[17].dt_txt.slice(0, 10));
		var tempF3 = (response.list[17].main.temp_max - 273.15) * 1.8 + 32;
		$("#dayThreeTemp").text(tempF3.toFixed(2) + " F");
		$("#dayThreeHumidity").text(response.list[17].main.humidity + "%");
		//Day 4 forecast
		$("#dayFourDate").text(response.list[25].dt_txt.slice(0, 10));
		var tempF4 = (response.list[25].main.temp_max - 273.15) * 1.8 + 32;
		$("#dayFourTemp").text(tempF4.toFixed(2) + " F");
		$("#dayFourHumidity").text(response.list[25].main.humidity + "%");
		//Day 5 forecast
		$("#dayFiveDate").text(response.list[33].dt_txt.slice(0, 10));
		var tempF5 = (response.list[33].main.temp_max - 273.15) * 1.8 + 32;
		$("#dayFiveTemp").text(tempF5.toFixed(2) + " F");
		$("#dayFiveHumidity").text(response.list[33].main.humidity + "%");
	});
});
