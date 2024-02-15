var MyKey = "8efc6ed3835ac107525a71beb81bc896";
var searchFormEl = document.getElementById("search-form");
var nowHeaderEl = document.getElementById("header-main")
var nowTempEl = document.getElementById("now-temp")
var nowWindEl = document.getElementById("now-wind")
var nowHumidEl = document.getElementById("now-humid")
// var inputFormEl = $('#search-input');
var inputFormEl = document.getElementById('search-input');
var fiveContainerEl = document.getElementById("five-container");
// var date = new Date(unixDate * 1000);
var icon ="";
// var iconLink = `http://openweathermap.org/img/w/${icon}.png`;
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
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MyKey}&units=imperial`;
    
    fetch(queryURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)
                var tempNow = data.main.temp
                var windNow = data.wind.speed
                var humidNow = data.main.humidity
                var dateNow = (data.dt)
                var date = new Date(dateNow *1000)
                var renderDate = date.toDateString();
                console.log(`Date: ${date}`)
                icon = data.weather[0].icon
                var iconLink = `http://openweathermap.org/img/w/${icon}.png`;
                nowHeaderEl.textContent = `${city} (${renderDate})`
                var iconNow = new Image(50, 50);
                iconNow.src = iconLink
                nowHeaderEl.appendChild(iconNow)
                nowTempEl.append(` ${tempNow} °F`)
                nowWindEl.append(` ${windNow} MPH`)
                nowHumidEl.append(` ${humidNow} %`)
                lat = data.coord.lat
                lon = data.coord.lon
                var query5DayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${MyKey}&units=imperial`
                console.log(`Lat:${lat}, Lon:${lon}`)
                fetch(query5DayURL).then(function(response) {
                    response.json().then(function(renderData) {
                        console.log(renderData);
                        for (var i = 6; i < 40; i += 8) {
                            var temp = renderData.list[i].main.temp
                            var wind = renderData.list[i].wind.speed
                            var humid = renderData.list[i].main.humidity
                            var dateFive = renderData.list[i].dt
                            var date = new Date(dateFive *1000)
                            var renderDate = date.toDateString();
                            var icon = renderData.list[i].weather[0].icon
                            var iconLink = `http://openweathermap.org/img/w/${icon}.png`;
                            var iconNew = new Image(50, 50);
                            iconNew.src = iconLink

                            var fiveCard = document.createElement('div');
                            fiveCard.classList.add('card', 'bg-warning');

                            var fiveDate = document.createElement('h5')
                            fiveDate.textContent = renderDate

                            // var fiveIcon = document.createElement('p')
                            // fiveIcon.innerHTML = iconNew

                            var fiveTemp = document.createElement('p')
                            fiveTemp.innerHTML = `Temp: ${temp} °F`

                            var fiveWind = document.createElement('p')
                            fiveWind.innerHTML = `Wind: ${wind} MPH`
                            
                            var fiveHumid = document.createElement('p')
                            fiveHumid.innerHTML = `Humidity: ${humid} %`
                            
                            fiveCard.append(fiveDate, iconNew, fiveTemp, fiveWind, fiveHumid)
                            // fiveContainerEl.appendChild(fiveIcon)
                            fiveContainerEl.append(fiveCard);
                        }
                        
                    })
                })
            });
        } else {
            return console.error("Sorry, there was an issue with your request.")
        }
    }).then(function () {
        console.log("Render searched button to list here.")
        // for (var i = 0; i < 40; i += 8) {
        //     renderFive(data.results[i]);
            

        //     fiveHeaderEl.appendChild(iconFive)
        //     fiveTempEl.append(` ${tempFive} °F`)
        //     fiveWindEl.append(` ${windFive} MPH`)
        //     fiveHumidEl.append(` ${humidFive} %`)
        // }
    })
};

function submitHandler(event) {
  event.preventDefault();
  
    console.log(inputFormEl.value);
    
    if (!inputFormEl.value) {
        return alert("Please enter a city into the search box.");
    }
    getHandler(inputFormEl)
}

// function renderFive(data) {
//     console.log(data);
//     var temp = data.list[i].main.temp
//     var wind = data.list[i].main.wind.speed
//     var humid = data.list[i].main.humidity
//     var dateFive = data.list[i].main.dt
//     var date = new Date(dateFive *1000)
//     var renderDate = date.toDateString();
//     icon = data.weather[i].icon
//     var iconLink = `http://openweathermap.org/img/w/${icon}.png`;
//     fiveHeaderEl.textContent = `${city} (${renderDate})`
//     var iconFive = new Image(50, 50);
//     iconFive.src = iconLink

//     var fiveCard = document.createElement('div');
//     fiveCard.classList.add('card', 'bg-warning');

//     var fiveDate = document.createElement('h5')
//     fiveDate.textContent = renderDate

//     var fiveIcon = document.createElement('p')
//     fiveIcon.innerHTML = icon

//     var fiveTemp = document.createElement('p')
//     fiveTemp.innerHTML = temp

//     var fiveWind = document.createElement('p')
//     fiveWind.innerHTML = wind
    
//     var fiveHumid = document.createElement('p')
//     fiveHumid.innerHTML = humid

//     fiveCard.append(fiveDate, fiveIcon, fiveTemp, fiveWind, fiveHumid)
//     fiveContainerEl.append(fiveCard);
// }

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