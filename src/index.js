import UI from "./ui";
import Controller from "./controller";
import sampleJson from "./sample.json";

function getCurrentLocationLatAndLon() {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
}

async function main() {
  try {
    let weatherJson;
    let locationJson;
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

    const weatherData = await Controller.processJson(weatherJson, locationJson);
    UI.renderCurrentWeather(weatherData.location, weatherData.current);
    UI.renderWeeklyWeather(weatherData.weekly);
    const hourly = Controller.processHourlyWeather(weatherJson);
    UI.initDailyBlocks(hourly);
  } catch (err) {
    console.log(err);
  }
  UI.init();
}

main();
