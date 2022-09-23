import * as Controller from "./controller";
import sampleJson from "./sample.json";
import night from "./images/night.jpg";
import day from "./images/day.jpg";

const form = document.querySelector("form");

const search = document.querySelector("form input");

const currentWeatherSection = document.getElementById("current-weather");

const weeklyWeatherSection = document.getElementById("weekly-weather");

const hourlyWeatherSection = document.getElementById("hourly-weather");

function setDayOrNight() {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  // day
  if (hours > 6 && hours < 20) {
    document.body.style.backgroundImage = `url(${day})`;
    document.body.style.color = "white";
  }
  // night
  else {
    document.body.style.backgroundImage = `url(${night})`;
    document.body.style.color = "white";
  }
}

function formatTime(unixTime) {
  const date = new Date(unixTime * 1000);
  let hours = date.getHours();
  let ampm;
  if (hours >= 12) {
    ampm = "pm";
  } else {
    ampm = "am";
  }
  hours = ((hours + 11) % 12) + 1;
  return hours + ampm;
}

function renderCurrentWeather(locationJSON, currentWeatherJSON) {
  currentWeatherSection.innerHTML = `<div class="current-weather-container">
      <div class="location"><p>${locationJSON.value}</p></div>
      <div class="left"><p class="current-temp">${Math.round(
        currentWeatherJSON.currentTemp
      )}° F</p>
  <div class="weather-condition"><img src="http://openweathermap.org/img/wn/04d@2x.png" class="icon">
  <p class="description">${
    currentWeatherJSON.description
  }</p><div></div></div></div>
      <div class="right"><div class="details"><p class="feels-like">Feels Like: ${Math.round(
        currentWeatherJSON.feelsLike
      )}° F</p>
  <p class="wind">Wind: ${currentWeatherJSON.wind} MPH</p>
  <p class="humidity">Humidity: ${currentWeatherJSON.humidity} %</p></div></div>
  </div>`;
}

function renderWeeklyWeather(weekJSON) {
  weeklyWeatherSection.innerHTML = "";
  weekJSON.forEach((dayJSON) => {
    const weekdayContainer = document.createElement("div");
    weekdayContainer.classList.add("weekday-weather-container");
    weekdayContainer.innerHTML = `<div class="week-day"><p>${
      dayJSON.day.weekday
    }</p></div><div class="day-weather"><p class="high">${Math.round(
      dayJSON.day.high
    )}° F</p><p class="low">${Math.round(
      dayJSON.day.low
    )}° F</p></div><div class="day-condition"><img width="100" height="100" src="http://openweathermap.org/img/wn/${
      dayJSON.day.icon
    }@2x.png"></div>`;

    weeklyWeatherSection.appendChild(weekdayContainer);
  });
}

function toggleHourlyWeatherContainer() {
  hourlyWeatherSection.classList.toggle("hidden");
}

function renderHourlyWeather(hours) {
  hourlyWeatherSection.innerHTML = "";
  hours.forEach((timeSlot) => {
    const timeSlotContainer = document.createElement("div");
    timeSlotContainer.classList.add("time-slot");
    timeSlotContainer.innerHTML = `<div class="time-slot">
      <p class="time">${formatTime(timeSlot.dt)}</p>
          <img width="50" height="50" class="hour-icon" src="http://openweathermap.org/img/wn/${
            timeSlot.weather[0].icon
          }@2x.png">
          <p class="hour-rain">${Math.round(timeSlot.pop * 100)}%</p>
      <p class="hour-temp">${Math.round(timeSlot.temp)}° F</p>
  </div>`;
    hourlyWeatherSection.appendChild(timeSlotContainer);
  });
}

function initDailyBlocks(hourlyList) {
  const dailyBlockList = document.querySelectorAll(
    ".weekday-weather-container"
  );
  for (let i = 0; i < hourlyList.length; i++) {
    // add div to toggle arrow styling to point to which block toggled the hourly forecast
    const arrow = document.createElement("div");
    arrow.classList.add("arrow");
    dailyBlockList[i].appendChild(arrow);

    arrow.addEventListener("click", (e) => {
      // check is another arrow is already toggled
      const toggledArrow = document.querySelector(".arrow-down");
      if (toggledArrow !== null) {
        if (toggledArrow !== e.target) {
          toggledArrow.classList.remove("arrow-down");
        }
      }
      e.target.classList.toggle("arrow-down");

      console.log(hourlyWeatherSection);
      const isHidden = hourlyWeatherSection.classList.contains("hidden");
      if (!isHidden && e.target.classList.contains("arrow-down")) {
        renderHourlyWeather(hourlyList[i]);
      } else {
        toggleHourlyWeatherContainer();
        renderHourlyWeather(hourlyList[i]);
      }
    });
  }
}

(async function init() {
  setDayOrNight();
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // search field is not empty
    if (search.value !== "") {
      try {
        hourlyWeatherSection.innerHTML = "";
        const locationJson = await Controller.getLatLon(search.value);
        const weatherJson = await Controller.getWeatherAtCoordinates(
          locationJson.lat,
          locationJson.lon
        );
        const weatherData = await Controller.processJson(
          weatherJson,
          locationJson
        );

        renderCurrentWeather(weatherData.location, weatherData.current);
        renderWeeklyWeather(weatherData.weekly);
        initDailyBlocks(weatherData.hourly);
      } catch (err) {
        console.log(err);
      }
    }
  });
})();

export {
  setDayOrNight,
  renderCurrentWeather,
  renderWeeklyWeather,
  initDailyBlocks,
};
