// ###### Importing module ###### //

import getWeatherIcon from "./weather_data.js";
const icon = getWeatherIcon();

// ###### data fetching functionalities ###### //

const api_key = "82b5e5be1ba04601ab827654f6ef9719";
const cityName = "chittagong";
const apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;
const citySearchApi = "https://api.teleport.org/api/cities/?limit=8&search=";

const getCityData = async (value) => {
  const endpoint = citySearchApi + value;
  const res = await fetch(endpoint);
  const data = await res.json();
  renderSuggestions(data._embedded["city:search-results"]);
};
const getWeatherData = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  renderWeather(data);
  forecastData(data);
};

const forecastData = async (apiData) => {
  console.log(apiData);
  const city = apiData.id;
  const endpoint = `https://api.openweathermap.org/data/2.5/forecast?&units=metric&id=${city}&appid=82b5e5be1ba04601ab827654f6ef9719`;
  const res = await fetch(endpoint);
  const data = await res.json();
  const list = data.list;
  const foreCastTemp = [];
  list.forEach((obj) => {
    const date = new Date(obj.dt_txt);
    const hour = date.getHours();
    if (hour === 12) {
      foreCastTemp.push(obj);
    }
  });
  renderForecast(foreCastTemp);
};

// ###### searching functionalities ###### //
const searchInput = document.querySelector(".weather__search");

searchInput.addEventListener("input", () => {
  getCityData(searchInput.value);
});

searchInput.addEventListener("keydown", (e) => {
  const inpValue = searchInput.value;
  let cityName;
  if (inpValue.includes(",")) {
    cityName =
      inpValue.slice(0, inpValue.indexOf(",")) +
      inpValue.slice(inpValue.lastIndexOf(","));
  }
  const apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}&units=metric`;
  if (e.keyCode == 13) {
    getWeatherData(apiEndPoint);
  }
});

// ###### render functionalities ###### //

const city = document.querySelector(".weather__city");
const day = document.querySelector(".weather__day");
const humidity = document.querySelector(
  ".weather__indicator--humidity > .value"
);
const wind = document.querySelector(".weather__indicator--wind > .value");
const pressure = document.querySelector(
  ".weather__indicator--pressure > .value"
);
const weatherImage = document.querySelector(".weather__image");
const temp = document.querySelector(".weather__temperature > .value");
const weatherForecast = document.querySelector(".weather__forecast");
const suggestions = document.querySelector("#suggestions");

//###### rendering weather ######//
const renderWeather = (data) => {
  city.textContent = data.name;
  day.textContent = findDay(data.dt);
  humidity.textContent = data.main.humidity;
  wind.textContent = `${getDirection(data.wind.deg)} ${data.wind.speed}`;
  pressure.textContent = data.main.pressure;
  const iconId = data.weather[0].id;
  icon.forEach((obj) => {
    if (obj.ids.includes(iconId)) {
      weatherImage.src = obj.url;
    }
  });
  temp.textContent = `${
    data.main.temp >= 0 ? +data.main.temp : +data.main.temp
  }`;
};
// ######rendering forecast ######//
const renderForecast = (data) => {
  weatherForecast.innerHTML = "";
  data.forEach((obj) => {
    const temp = obj.main.temp;
    const dayName = new Date(obj.dt_txt).toLocaleDateString("en-En", {
      weekday: "long",
    });
    const icon = `http://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`;
    const desc = obj.weather[0].description;
    weatherForecast.innerHTML += `<article class="weather__forecast__item">
      <img
        src="${icon}"
        alt="${desc}"
        class="weather__forecast__icon"
      />
      <h3 class="weather__forecast__day">${dayName}</h3>
      <p class="weather__forecast__temperature">
        <span class="value">${temp}</span> &deg;C
      </p>
    </article>`;
  });
};

// ###### rendering city suggestions ######//
const renderSuggestions = (data) => {
  suggestions.innerHTML = "";
  data.forEach((loc) => {
    suggestions.innerHTML += `<option value="${loc.matching_full_name}"></option>`;
  });
};

const findDay = (value) => {
  console.log(new Date(value * 1000));
  const day = new Date(value * 1000).toLocaleDateString("en-En", {
    weekday: "long",
  });
  return day;
  //const date = new Date();
  // const days = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];
  // return days[date.getUTCDay()];
};

const getDirection = (angle) => {
  const directions = [
    "North",
    "North-East",
    "East",
    "South-East",
    "South",
    "South-West",
    "West",
    "North-West",
  ];
  const index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
  return directions[index];
};
// ###### initializing the app ###### //
getWeatherData(apiEndPoint);
