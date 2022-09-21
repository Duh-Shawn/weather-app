import Controller from "./controller";
import sampleJson from "./sample.json";

class UI {
  static form = document.querySelector("form");

  static search = document.querySelector("form input");

  static weeklyWeather = document.getElementById("weekly-weather");

  static renderCurrentWeather(locationJSON, currentWeatherJSON) {
    const locationDiv = document.querySelector(
      ".current-weather-container .location"
    );
    locationDiv.innerHTML = `<p>${locationJSON.value}</p>`;

    const leftDiv = document.querySelector(".current-weather-container .left");
    leftDiv.innerHTML = `<p class="current-temp">${currentWeatherJSON.currentTemp}&deg; F</p>
    <div class="weather-condition"><img src="http://openweathermap.org/img/wn/${currentWeatherJSON.icon}@2x.png" class="icon"></img>
    <p class="description">${currentWeatherJSON.description}</p><div>`;

    const rightDiv = document.querySelector(
      ".current-weather-container .right"
    );
    rightDiv.innerHTML = `<div class="details"><p class="feels-like">Feels Like: ${currentWeatherJSON.feelsLike}&deg; F</p>
    <p class="wind">Wind: ${currentWeatherJSON.wind} MPH</p>
    <p class="humidity">Humidity: ${currentWeatherJSON.humidity} %</p></div>`;
  }

  static renderyWeeklyWeather(weekJSON) {
    UI.weeklyWeather.innerHTML = "";
    weekJSON.forEach((day) => {
      const weekdayContainer = document.createElement("div");
      weekdayContainer.classList.add("weekday-weather-container");

      const dayOfWeek = document.createElement("div");
      dayOfWeek.classList.add("week-day");
      dayOfWeek.innerHTML = `<p>${day.day.weekday}</p>`;
      weekdayContainer.appendChild(dayOfWeek);

      const dayWeather = document.createElement("div");
      dayWeather.classList.add("day-weather");
      dayWeather.innerHTML = `<p class="high">${day.day.high}&deg; F</p><p class="low">${weekJSON[0].day.low}&deg; F</p>`;
      weekdayContainer.appendChild(dayWeather);

      const dayWeatherCondition = document.createElement("div");
      dayWeatherCondition.classList = "day-condition";
      const weatherImage = new Image(100, 100);
      weatherImage.src = `http://openweathermap.org/img/wn/${day.day.icon}@2x.png`;
      dayWeatherCondition.appendChild(weatherImage);
      weekdayContainer.appendChild(dayWeatherCondition);

      UI.weeklyWeather.appendChild(weekdayContainer);
    });
  }

  static async init() {
    UI.form.addEventListener("submit", async (e) => {
      e.preventDefault();
      // search field is not empty
      if (UI.search.value !== "") {
        try {
          const coordinates = await Controller.getLatLon(UI.search.value);
          const weatherJson = await Controller.getWeatherAtCoordinates(
            coordinates.lat,
            coordinates.lon
          );
          const weatherData = await Controller.processJson(weatherJson);
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
