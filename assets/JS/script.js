var APIKey = "e61b60c59683fe9b41331ae6e86feeda"; // OpenWeather API Key for 
var cityName; // variable for storing name of city
var resp; // variable for json response
var data; // variable for json data
var lat; // variable for lattitude of city
var lon; // variable for longitude of city
var cityStore; // stores city name

var citySearch = document.getElementById('citySearch');
var button2 = document.getElementById('button-addon2');

// Logic for getting city name from search box when button is clickedl.
button2.addEventListener("click", function () {
  localStorage.setItem('cityStore', citySearch.value);
  console.log(cityStore)
  geoCode(citySearch.value);
  weatherReport(citySearch.value);
});


//  Weather report for main weather box
function weatherReport(cityName) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIKey)
    .then(function (resp) { return resp.json() }) // Convert data to json
    .then(function (data) {

      drawWeather(data);
      console.log(data);
    })
    .catch(function () {
      // catch any errors
    });
}

// Geocoding API for finding lattitude and longitude of city
function geoCode(cityName) {
  fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=' + APIKey)
    .then(function (resp) { return resp.json() })
    .then(function (data) {
      lat = data[0].lat;
      lon = data[0].lon;
      fiveDay(lat, lon);
    });
}

// Function to display weather data in main weather report box
function drawWeather(d) {
  var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
  var fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);

  document.getElementById('location').innerHTML = `Location: ${d.name}`;
  document.getElementById('description').innerHTML = `Description: ${d.weather[0].description}`;
  document.getElementById('temp').innerHTML = `Temperature: ${fahrenheit}  &deg F`;
  document.getElementById('wind').innerHTML = `Wind: ${d.wind.speed} m/s`;
  document.getElementById('humidity').innerHTML = `Humidity: ${d.main.humidity} %`;
}

// Function to get five-day forecast data and display it.
function fiveDay(lat, lon) {
  fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&units=imperial')
    .then(function (resp) { return resp.json() })
    .then(function (data) {

      console.log(data);
      drawFiveDay(data);
    });
}

// Writes five day weather forecast to boxes
function drawFiveDay(d) {

  document.getElementById('date1').innerHTML = `${d.list[7].dt_txt}`;
  document.getElementById('temp1').innerHTML = `Temp: ${d.list[7].main.temp}  &deg F`;
  document.getElementById('wind1').innerHTML = `Wind: ${d.list[7].wind.speed} m/s`;
  document.getElementById('humidity1').innerHTML = `Humidity: ${d.list[7].main.humidity} %`;

  document.getElementById('date2').innerHTML = `${d.list[15].dt_txt}`;
  document.getElementById('temp2').innerHTML = `Temp: ${d.list[15].main.temp}  &deg F`;
  document.getElementById('wind2').innerHTML = `Wind: ${d.list[15].wind.speed} m/s`;
  document.getElementById('humidity2').innerHTML = `Humidity: ${d.list[15].main.humidity} %`;

  document.getElementById('date3').innerHTML = `${d.list[23].dt_txt}`;
  document.getElementById('temp3').innerHTML = `Temp: ${d.list[23].main.temp}  &deg F`;
  document.getElementById('wind3').innerHTML = `Wind: ${d.list[23].wind.speed} m/s`;
  document.getElementById('humidity3').innerHTML = `Humidity: ${d.list[23].main.humidity} %`;

  document.getElementById('date4').innerHTML = `${d.list[31].dt_txt}`;
  document.getElementById('temp4').innerHTML = `Temp: ${d.list[31].main.temp}  &deg F`;
  document.getElementById('wind4').innerHTML = `Wind: ${d.list[31].wind.speed} m/s`;
  document.getElementById('humidity4').innerHTML = `Humidity: ${d.list[31].main.humidity} %`;

  document.getElementById('date5').innerHTML = `${d.list[39].dt_txt}`;
  document.getElementById('temp5').innerHTML = `Temp: ${d.list[39].main.temp}  &deg F`;
  document.getElementById('wind5').innerHTML = `Wind: ${d.list[39].wind.speed} m/s`;
  document.getElementById('humidity5').innerHTML = `Humidity: ${d.list[39].main.humidity} %`;
}

