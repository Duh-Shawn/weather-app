import * as UI from "./ui";
import * as Controller from "./controller";
import sampleJson from "./sample.json";

function getCurrentLocationLatAndLon() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}

async function main() {
  let weatherJson;
  let locationJson;
  try {
    if ("geolocation" in navigator) {
      /* geolocation is available */
      const position = await getCurrentLocationLatAndLon();
      locationJson = await Controller.getLocationFromLatLon(
        position.coords.latitude,
        position.coords.longitude
      );
      weatherJson = await Controller.getWeatherAtCoordinates(
        locationJson.lat,
        locationJson.lon
      );
    } else {
      /* geolocation IS NOT available */
      locationJson = await Controller.getLatLon("London");
      weatherJson = await Controller.getWeatherAtCoordinates(
        locationJson.lat,
        locationJson.lon
      );
    }
  } catch (err) {
    console.log(err);
  }

  try {
    const location = await Controller.processLocation(locationJson);
    const current = await Controller.processCurrentWeather(weatherJson);
    UI.renderCurrentWeather(location, current);
  } catch (err) {
    console.log(err);
  }

  try {
    const weekly = await Controller.processWeeklyWeather(weatherJson);
    UI.renderWeeklyWeather(weekly);
  } catch (err) {
    console.log(err);
  }

  try {
    const hourly = await Controller.processHourlyWeather(weatherJson);
    UI.initDailyBlocks(hourly);
  } catch (err) {
    console.log(err);
  }

  // const weatherData = await Controller.processJson(weatherJson, locationJson);
  // UI.renderCurrentWeather(weatherData.location, weatherData.current);
  // UI.renderWeeklyWeather(weatherData.weekly);
  // const hourly = Controller.processHourlyWeather(weatherJson);
  // UI.initDailyBlocks(hourly);
}

main();
