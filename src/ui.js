import Controller from "./controller";
import sampleJson from "./sample.json";

class UI {
  static form = document.querySelector("form");

  static search = document.querySelector("form input");

  static renderCurrentWeather(locationJSON, currentWeatherJSON) {
    const locationDiv = document.querySelector(
      ".current-weather-container .location"
    );
    locationDiv.innerHTML = `<p>${locationJSON.value}</p>`;

    const leftDiv = document.querySelector(".current-weather-container .left");
    console.log(leftDiv);
    leftDiv.innerHTML = `<p class="currentTemp">${currentWeatherJSON.currentTemp}</p>
    <img src="http://openweathermap.org/img/wn/${currentWeatherJSON.icon}@2x.png" class="icon"></img>`

    const rightDiv = document.querySelector(".current-weather-container .right");
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
          //   const coordinates = await Controller.getLatLon(UI.search.value);
          //   const weatherData = await Controller.processJson(sampleJson);
          console.log(coordinates);
          console.log(weatherData);
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
}

export default UI;
