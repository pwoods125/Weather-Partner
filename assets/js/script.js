// GIVEN a weather dashboard with form inputs
//  and 
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

var userSearchFormEl = document.getElementById('user-search-form');
var searchBtnEl = document.getElementById("searchbtn");
var citynameEl = document.getElementById("cityname");
var city = document.querySelectorAll(".city");
var dateEl = document.getElementsByClassName("date");
var temp = document.getElementsByClassName("temp");
var forecast = document.getElementsByClassName("forecast");
var icon = document.getElementsByClassName("icon");
var humidity = document.getElementsByClassName("humidity");
var windspeed = document.getElementsByClassName("windspeed");
var searchHistorBtn1 = document.querySelector("#user-city-1");

  displaySavedUserInput();

function userInput(event){
  event.preventDefault();
// capture user input
  var citynameValue = citynameEl.value
  getWeather(citynameValue);
  saveUserInput(citynameValue);
  displaySavedUserInput();
}

function getWeather(x){
  fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + x + "&appid=f188485bc265ae795fef301027c27bbc&units=imperial")
  .then(function (response) {
    return response.json();
  }).then(function(data){
    var days = data.list;
    var timeframe = 8;
    var newDay = 1;
    $.each($('.weather-container'), function(i, container) {
      city[i].textContent = data.city.name
      newDay = i * timeframe; 
      dateEl[i].textContent = days[newDay].dt_txt
      temp[i].textContent = days[newDay].main.temp
      forecast[i].textContent = days[newDay].weather[0].main
      icon[i].src = "http://openweathermap.org/img/wn/" + days[newDay].weather[0].icon + ".png"
      humidity[i].textContent = days[newDay].main.humidity + "%"
      windspeed[i].textContent = days[newDay].wind.speed
    });
  }); 
}

function saveUserInput(){
  localStorage.setItem("City Searched", citynameEl.value);
}

function displaySavedUserInput(){
  searchHistorBtn1.textContent = localStorage.getItem("City Searched");
}

function getPreviousWeather(){
  getWeather(searchHistorBtn1.textContent);
}

searchBtnEl.addEventListener("click",userInput);

searchHistorBtn1.addEventListener("click", getPreviousWeather);

// WHEN I search for a city that city is added to the search history
  // WHEN I click the save button for that timeblock
  // THEN the text for that event is saved in local storage
  // WHEN I refresh the page
  // THEN the saved events persist


    // Below were attempts that did not work.
    // Keeping that information for learning purposes. 
          //   $('.weather-container').each(function() {
          //     var i = 0
          //     dateEl.textContent = days[i].dt_txt
          //     temp.textContent = days[i].main.temp
          //     forecast.textContent = days[i].weather[0].main
          //     icon.src = "http://openweathermap.org/img/wn/" + days[i].weather[0].icon + ".png"
          //     humidity.textContent = days[i].main.humidity + "%"
          //     windspeed.textContent = days[i].wind.speed
          //     i++
          //  });

          // This worked but only for one container, not all. 
            // for (var i = 0; i < 5; i++){
            //   dateEl.textContent = days[i].dt_txt
            //   temp.textContent = days[i].main.temp
            //   forecast.textContent = days[i].weather[0].main
            //   icon.src = "http://openweathermap.org/img/wn/" + days[i].weather[0].icon + ".png"
            //   humidity.textContent = days[i].main.humidity + "%"
            //   windspeed.textContent = days[i].wind.speed
            // };