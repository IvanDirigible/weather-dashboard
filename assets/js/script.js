var MyKey = "8efc6ed3835ac107525a71beb81bc896";
var searchFormEl = document.getElementById('search-form');
// var inputFormEl = $('#search-input');
var inputFormEl = document.getElementById('search-input');
var city = "";
var lat = "";
var lon = "";
// var state = "";
// var country = "";
var limit = 1;
var submitEl = document.getElementById("submit-btn");
// var geocodingDURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=${limit}&appid=${MyKey}`;

var getHandler = function (city) {
    city = inputFormEl.value
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MyKey}`;
    
    fetch(queryURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                lat = data.coord.lat
                lon = data.coord.lon
                var query5DayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${MyKey}`
                console.log(`Lat:${lat}, Lon:${lon}`)
                fetch(query5DayURL).then(function(response) {
                    response.json().then(function(renderData) {
                        return console.log(renderData)
                    })
                })
            });
        } else {
            return console.error("Sorry, there was an issue with your request.")
        }
    }).then()
};

function submitHandler(event) {
  event.preventDefault();
  
    console.log(inputFormEl.value);
    
    if (!inputFormEl.value) {
        return alert("Please enter a city into the search box.");
    }
    getHandler(inputFormEl)
}

// function getHandler(inputFormEl){
//     city = inputFormEl.value;
//     console.log(city)
//     fetch(queryURL, {
//         method: "GET"
//     })
//     console.log(`Success? ${queryURL}`)
//     .then(function(city){
//         console.log(city.status)
//         console.log(city)
//         lat = city.coord.lat
//         lon = city.coord.lon
//         console.log(lat)
//         console.log(lon)
//         return city.json()
//     })
//     .then(function(data){
//         console.log(data);
//         lat = data.coord.lat;
//         lon = data.coord.lon;
//     })
//     fetch(query5DayURL, {
//         method: "GET"
//     })
//     .then(function (render5Day){
//         console.log("So far so good!")
//     })
// }

submitEl.addEventListener("click", submitHandler)