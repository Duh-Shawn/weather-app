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
    UI.renderWeeklyWeather(weatherData.weekly);
    const hourly = Controller.processHourlyWeather(weatherJson);
    UI.initDailyBlocks(hourly);
  } catch (err) {
    console.log(err);
  }
  UI.init();

  // console.log(UI.formatTime(1663812000));


  // const locationJson = await Controller.getLatLon("London");
  // const weatherData = await Controller.processJson(sampleJson, locationJson);
  // UI.renderCurrentWeather(weatherData.location, weatherData.current);
  // UI.renderyWeeklyWeather(weatherData.weekly);
  // UI.setDayOrNight();
  // let hourly = Controller.processHourlyWeather(sampleJson);
  // UI.initDailyBlocks(hourly);
}

main();
