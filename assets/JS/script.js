var APIKey = "e61b60c59683fe9b41331ae6e86feeda"; // OpenWeather API Key
var cityName; // variable for storing name of city
var resp; // variable for json response
var data; // variable for json data

function weatherReport( cityName ) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + APIKey)  
    .then(function(resp) { return resp.json() }) // Convert data to json
    .then(function(data) {

      drawWeather(data);
    })
    .catch(function() {
      // catch any errors
    });
  }

function drawWeather( d ) {
    var celcius = Math.round(parseFloat(d.main.temp)-273.15);
	var fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32); 
	
  document.getElementById('location').innerHTML = `Location: ${d.name}`;
  document.getElementById('description').innerHTML = `Description: ${d.weather[0].description}`;
	document.getElementById('temp').innerHTML = fahrenheit + '&deg;';
  document.getElementById('wind').innerHTML = `Wind: ${d.wind.speed}`;

}

  window.onload = function() {
    weatherReport( "London" );
  }
  