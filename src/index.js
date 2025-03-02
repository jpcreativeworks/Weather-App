function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value.trim();
  
    if (city) {
      fetchWeather(city);
    } else {
      alert("Please enter a valid city or check spelling.");
    }
  }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  
  currentDateELement.innerHTML = formatDate(currentDate);
  
  let apiKey = "7fd5430a29oa8949b4d239de06t9a3d4";
  
  function fetchWeather(city) {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  
    axios.get(apiUrl).then(displayWeather).catch(handleError);
  }
  let celsiusTemperature = null;
  
  function displayWeather(response) {
    console.log(response.data);
    let data = response.data;
    //let city = data.city;
    //let temperature = Math.round(data.temperature.current);
    //let humidity = data.temperature.humidity;
    //let windSpeed = Math.round(data.wind.speed);
    //let weatherEmoji = data.condition.icon;
    let weatherIconCode = data.condition.icon;
  
    document.querySelector("#current-city").innerHTML = data.city;
    document.querySelector(".current-temperature-value").innerHTML = Math.round(
      data.temperature.current
    );
    document.querySelector(".current-humidity").innerHTML =
      data.temperature.humidity;
    document.querySelector(".current-wind").innerHTML = Math.round(
      data.wind.speed
    );
  
    let iconUrl = `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIconCode}.png`;
    document.querySelector(
      ".current-temperature-icon"
    ).innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`;
  }
  
  function handleError(error) {
    alert("City not found. Please try another location or check your spelling.");
  }
  