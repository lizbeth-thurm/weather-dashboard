var APIKey = "e61b60c59683fe9b41331ae6e86feeda"; // OpenWeather API Key for 
var cityName; // variable for storing name of city
var resp; // variable for json response
var data; // variable for json data
var lat; // variable for lattitude of city
var lon; // variable for longitude of city

var citySearch = document.getElementById('citySearch');
var button2 = document.getElementById('button-addon2');

// Logic for getting city name from search box when button is clickedl.
button2.addEventListener("click", function () {
  console.log(citySearch.value);
  geoCode(citySearch.value);
  weatherReport(citySearch.value);
});

// Save data to localStorage
localStorage.setItem('key', JSON.stringify('value'));


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

  document.getElementById('date1').innerHTML = `${d.list[6].dt_txt}`;
  document.getElementById('temp1').innerHTML = `Temp: ${d.list[6].main.temp}  &deg F`;
  document.getElementById('wind1').innerHTML = `Wind: ${d.list[6].wind.speed} m/s`;
  document.getElementById('humidity1').innerHTML = `Humidity: ${d.list[6].main.humidity} %`;

  document.getElementById('date2').innerHTML = `${d.list[14].dt_txt}`;
  document.getElementById('temp2').innerHTML = `Temp: ${d.list[14].main.temp}  &deg F`;
  document.getElementById('wind2').innerHTML = `Wind: ${d.list[14].wind.speed} m/s`;
  document.getElementById('humidity2').innerHTML = `Humidity: ${d.list[14].main.humidity} %`;

  document.getElementById('date3').innerHTML = `${d.list[22].dt_txt}`;
  document.getElementById('temp3').innerHTML = `Temp: ${d.list[22].main.temp}  &deg F`;
  document.getElementById('wind3').innerHTML = `Wind: ${d.list[22].wind.speed} m/s`;
  document.getElementById('humidity3').innerHTML = `Humidity: ${d.list[22].main.humidity} %`;

  document.getElementById('date4').innerHTML = `${d.list[30].dt_txt}`;
  document.getElementById('temp4').innerHTML = `Temp: ${d.list[30].main.temp}  &deg F`;
  document.getElementById('wind4').innerHTML = `Wind: ${d.list[30].wind.speed} m/s`;
  document.getElementById('humidity4').innerHTML = `Humidity: ${d.list[30].main.humidity} %`;

  document.getElementById('date5').innerHTML = `${d.list[38].dt_txt}`;
  document.getElementById('temp5').innerHTML = `Temp: ${d.list[38].main.temp}  &deg F`;
  document.getElementById('wind5').innerHTML = `Wind: ${d.list[38].wind.speed} m/s`;
  document.getElementById('humidity5').innerHTML = `Humidity: ${d.list[38].main.humidity} %`;
}

