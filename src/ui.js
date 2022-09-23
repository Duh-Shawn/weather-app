import Controller from "./controller";
import sampleJson from "./sample.json";
import night from "./images/night.jpg";
import day from "./images/day.jpg";

class UI {
  static form = document.querySelector("form");

  static search = document.querySelector("form input");

  static currentWeatherSection = document.getElementById("current-weather");

  static weeklyWeatherSection = document.getElementById("weekly-weather");

  static hourlyWeatherSection = document.getElementById("hourly-weather");

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

  static formatTime(unixTime) {
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

  static renderWeeklyWeather(weekJSON) {
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
      )}° F</p></div><div class="day-condition"><img width="100" height="100" src="http://openweathermap.org/img/wn/${
        dayJSON.day.icon
      }@2x.png"></div>`;

      UI.weeklyWeatherSection.appendChild(weekdayContainer);
    });
  }

  static toggleHourlyWeatherContainer() {
    UI.hourlyWeatherSection.classList.toggle("hidden");
  }

  static renderHourlyWeather(hours) {
    UI.hourlyWeatherSection.innerHTML = "";
    hours.forEach((timeSlot) => {
      const timeSlotContainer = document.createElement("div");
      timeSlotContainer.classList.add("time-slot");
      timeSlotContainer.innerHTML = `<div class="time-slot">
      <p class="time">${UI.formatTime(timeSlot.dt)}</p>
          <img width="50" height="50" class="hour-icon" src="http://openweathermap.org/img/wn/${
            timeSlot.weather[0].icon
          }@2x.png">
          <p class="hour-rain">${Math.round(timeSlot.pop * 100)}%</p>
      <p class="hour-temp">${Math.round(timeSlot.temp)}° F</p>
  </div>`;
      UI.hourlyWeatherSection.appendChild(timeSlotContainer);
    });
  }

  static initDailyBlocks(hourlyList) {
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

        console.log(UI.hourlyWeatherSection);
        const isHidden = UI.hourlyWeatherSection.classList.contains("hidden");
        if (!isHidden && e.target.classList.contains("arrow-down")) {
          UI.renderHourlyWeather(hourlyList[i]);
        } else {
          UI.toggleHourlyWeatherContainer();
          UI.renderHourlyWeather(hourlyList[i]);
        }
      });
    }
  }

  static async init() {
    UI.setDayOrNight();
    UI.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      // search field is not empty
      if (UI.search.value !== "") {
        try {
          UI.hourlyWeatherSection.innerHTML = "";
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
          UI.renderWeeklyWeather(weatherData.weekly);
          UI.initDailyBlocks(weatherData.hourly);
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
}

export default UI;
