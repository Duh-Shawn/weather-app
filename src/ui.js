import Controller from "./controller";
import sampleJson from "./sample.json";
import night from "./images/night.jpg";
import day from "./images/day.jpg";

class UI {
  static form = document.querySelector("form");

  static search = document.querySelector("form input");

  static currentWeatherSection = document.getElementById("current-weather");

  static weeklyWeatherSection = document.getElementById("weekly-weather");

  static setDayOrNight() {
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

  static renderCurrentWeather(locationJSON, currentWeatherJSON) {
    UI.currentWeatherSection.innerHTML = `<div class="current-weather-container">
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

  static renderyWeeklyWeather(weekJSON) {
    UI.weeklyWeatherSection.innerHTML = "";
    weekJSON.forEach((dayJSON) => {
      const weekdayContainer = document.createElement("div");
      weekdayContainer.classList.add("weekday-weather-container");
      weekdayContainer.innerHTML = `<div class="week-day"><p>${
        dayJSON.day.weekday
      }</p></div><div class="day-weather"><p class="high">${Math.round(
        dayJSON.day.high
      )}° F</p><p class="low">${Math.round(
        dayJSON.day.low
      )}° F</p></div><div class="day-condition"><img width="100" height="100" src="http://openweathermap.org/img/wn/${dayJSON.day.icon}@2x.png"></div>`;

      UI.weeklyWeatherSection.appendChild(weekdayContainer);
    });
  }

  static async init() {
    UI.setDayOrNight();
    UI.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      // search field is not empty
      if (UI.search.value !== "") {
        try {
          const locationJson = await Controller.getLatLon(UI.search.value);
          const weatherJson = await Controller.getWeatherAtCoordinates(
            locationJson.lat,
            locationJson.lon
          );
          const weatherData = await Controller.processJson(
            weatherJson,
            locationJson
          );
          UI.renderCurrentWeather(weatherData.location, weatherData.current);
          UI.renderyWeeklyWeather(weatherData.week);
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
}

export default UI;
