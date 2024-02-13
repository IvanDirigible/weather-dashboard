var MyKey = "8efc6ed3835ac107525a71beb81bc896";
var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MyKey}`;
var searchFormEl = document.getElementById('search-form');
// var inputFormEl = $('#search-input');
var inputFormEl = document.getElementById('search-input');
var city = "";
var lat = "";
var lon = "";
var state = "";
var country = "";
var limit = 1;
var query5DayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${MyKey}`
var submitEl = document.getElementById("submit-btn");
var geocodingDURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=${limit}&appid=${MyKey}`;



function submitHandler(event) {
  event.preventDefault();
  
    console.log(inputFormEl.value);
    
    if (!inputFormEl.value) {
        return alert("Please enter a city into the search box.");
    }
    getHandler(inputFormEl)
}

function getHandler(inputFormEl){
    city = inputFormEl.value;
    fetch(queryURL, {
        method: "GET"
    })
    .then(function(response){
        // console.log(response.status)
        return response.json();
    })
    .then(function(data){
        console.log(data)
        lat = data.coord.lat;
        lon = data.coord.lon;
    })
    fetch(query5DayURL, {
        method: "GET"
    })
    .then(function (render5Day){
        console.log("So far so good!")
    })
}

submitEl.addEventListener("click", submitHandler)
// searchFormEl.on('submit', submitHandler);