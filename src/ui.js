import Controller from "./controller";
import sampleJson from "./sample.json";

class UI {
  static form = document.querySelector("form");

  static search = document.querySelector("form input");

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
