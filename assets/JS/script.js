var APIKey = "e61b60c59683fe9b41331ae6e86feeda"; // OpenWeather API Key
var cityName; // variable for storing name of city
var resp; // variable for json response
var data; // variable for json data

function weatherReport( cityName ) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIKey)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
  }
  
  window.onload = function() {
    weatherReport( "London" );
  }