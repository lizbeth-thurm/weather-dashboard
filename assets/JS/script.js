var APIKey = "e61b60c59683fe9b41331ae6e86feeda"; // OpenWeather API Key for 
var cityName; // variable for storing name of city
var resp; // variable for json response
var data; // variable for json data
var lat;
var lon;

var citySearch = document.getElementById('citySearch');
var button2 = document.getElementById('button-addon2');

//  Weather report for main weather box
function weatherReport(cityName) {
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIKey)
    .then(function (resp) { return resp.json() }) // Convert data to json
    .then(function (data) {

      drawWeather(data);
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

function fiveDay(lat, lon) {
  fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + APIKey + '&units=imperial')
  .then(function (resp) { return resp.json() })
  .then(function (data) { 
console.log(data);
  });
}


function drawWeather(d) {
  var celcius = Math.round(parseFloat(d.main.temp) - 273.15);
  var fahrenheit = Math.round(((parseFloat(d.main.temp) - 273.15) * 1.8) + 32);

  document.getElementById('location').innerHTML = `Location: ${d.name}`;
  document.getElementById('description').innerHTML = `Description: ${d.weather[0].description}`;
  document.getElementById('temp').innerHTML = `Temperature: ${fahrenheit}  &deg F`;
  document.getElementById('wind').innerHTML = `Wind: ${d.wind.speed} m/s`;
  document.getElementById('humidity').innerHTML = `Humidity: ${d.main.humidity} %`;
}

button2.addEventListener("click", function(){
  console.log(citySearch.value);
  geoCode(citySearch.value);
});

window.onload = function () {
 // weatherReport("London");
  // geoCode("London");
}