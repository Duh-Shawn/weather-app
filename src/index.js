import UI from "./ui";
import Controller from "./controller";
import sampleJson from "./sample.json";

async function main() {
  try {
    const locationJson = await Controller.getLatLon("London");
    const weatherJson = await Controller.getWeatherAtCoordinates(
      locationJson.lat,
      locationJson.lon
    );
    const weatherData = await Controller.processJson(weatherJson, locationJson);
    UI.renderCurrentWeather(weatherData.location, weatherData.current);
    UI.renderyWeeklyWeather(weatherData.week);
  } catch (err) {
    console.log(err);
  }
  UI.init();
}

main();
