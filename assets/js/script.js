var MyKey = "8efc6ed3835ac107525a71beb81bc896";
var searchFormEl = document.getElementById("search-form");
var nowHeaderEl = document.getElementById("header-main")
var main = document.getElementById("weather-content");
var inputFormEl = document.getElementById('search-input');
var fiveContainerEl = document.getElementById("five-container");
var searchContainerEl = document.getElementById("search-container");
var weatherEl = document.getElementById("results");
var icon ="";
var city = "";
var lat = "";
var lon = "";
var submitEl = document.getElementById("submit-btn");

var getHandler = function (city) {
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MyKey}&units=imperial`;
    
    fetch(queryURL).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data)
                
                var tempNow = data.main.temp
                var windNow = data.wind.speed
                var humidNow = data.main.humidity
                var dateNow = data.dt
                var date = new Date(dateNow *1000)
                var renderDate = date.toDateString();
                console.log(`Date: ${date}`)
                icon = data.weather[0].icon
                var iconLink = `http://openweathermap.org/img/w/${icon}.png`;
                var iconNow = new Image(50, 50);
                iconNow.src = iconLink

                var todayCard = document.createElement('div');
                todayCard.classList.add("card", "bg-secondary");

                var todayHeader = document.createElement('h2');
                todayHeader.classList.add("card-header");
                todayHeader.setAttribute("id", "header-main")
                todayHeader.textContent = `${city} (${renderDate})`
                todayHeader.appendChild(iconNow)

                var todayTemp = document.createElement('p')
                todayTemp.innerHTML = `Temp: ${tempNow} °F`

                var todayWind = document.createElement('p')
                todayWind.innerHTML = `Wind: ${windNow} MPH`
                
                var todayHumid = document.createElement('p')
                todayHumid.innerHTML = `Humidity: ${humidNow} %`

                var forecastSection = document.createElement('div')

                var forecastHeader =  document.createElement('h3')
                forecastHeader.textContent = "5-day Forecast:"

                var forecastDeck = document.createElement('div')
                forecastDeck.classList.add("card-deck", "d-flex", "flex-row");
                forecastDeck.setAttribute("id", "five-container")

                todayCard.append(todayHeader, todayTemp, todayWind, todayHumid);
                forecastSection.append(forecastHeader, forecastDeck);
                weatherEl.append(todayCard, forecastSection);

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

                            var fiveTemp = document.createElement('p')
                            fiveTemp.innerHTML = `Temp: ${temp} °F`

                            var fiveWind = document.createElement('p')
                            fiveWind.innerHTML = `Wind: ${wind} MPH`
                            
                            var fiveHumid = document.createElement('p')
                            fiveHumid.innerHTML = `Humidity: ${humid} %`
                            
                            fiveCard.append(fiveDate, iconNew, fiveTemp, fiveWind, fiveHumid)

                            forecastDeck.append(fiveCard);
                        }
                        
                    })
                })
            });
        } else {
            return console.error("Sorry, there was an issue with your request.")
        }
    })
};

function submitHandler(event) {
    event.preventDefault();
    
    console.log(`Can you see this? ${inputFormEl.value}`);
    city = inputFormEl.value.replace(/(^\w)|([-\s]\w)/g, match => match.toUpperCase());
    if (!city) {
        return alert("Please enter a city into the search box.");
    }
    var citySearch = document.createElement('button')
        citySearch.classList.add("btn")
        citySearch.setAttribute("id", city)
        citySearch.textContent = city

        searchContainerEl.append(citySearch)
    getHandler(city)
    weatherEl.textContent = '';
};

function pastSearchHandler(target) {

    console.log(`Past: ${target}`)
    city = target
    getHandler(city)
    weatherEl.textContent = '';
};

submitEl.addEventListener("click", submitHandler);
searchContainerEl.addEventListener("click", e => pastSearchHandler(e.target.id));
