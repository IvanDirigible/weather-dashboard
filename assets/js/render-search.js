var MyKey = "8efc6ed3835ac107525a71beb81bc896";
var city = "";
var limit = 1;
var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MyKey}`;
var query5DayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${MyKey}`
var submitEl = $("#submit");
var geocodingDURL = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=${limit}&appid=${MyKey}`;



function submitHandler(event) {
  event.preventDefault();
  
    var inputEl = $(this).siblings("input").val()
    console.log(inputEl);
    getHandler(inputEl)

    if (!inputEl) {
      console.error("Please enter a city into the search box.");
      return;
    }
}

function getHandler(userInput){
    var url = `https://api.artic.edu/api/v1/products/search?q=${userInput}`
    fetch(url, {
        method: "GET"
    })
    .then(function(response){
        // console.log(response.status)
        return response.json();
    })
    .then(function(data){
        console.log(data)
        //Getting too late; have to go to sleep
    })
}

submitEl.on("click", submitHandler)