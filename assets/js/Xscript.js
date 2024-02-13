var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();
  console.log(event);
  console.log(searchInputVal);
  console.log(document.querySelector('#search-input').value);
  console.log(queryString);
  var searchInputVal = document.querySelector('#search-input').value;

  if (!searchInputVal) {
    console.error('Please enter a city name.');
    return;
  }

  var queryString = `http://api.openweathermap.org/data/2.5/weather?q=${searchInputVal}&appid=${MyKey}`;

  location.assign(queryString);

}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);
