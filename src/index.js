import UI from "./ui";
import Controller from "./controller";
import sampleJson from "./sample.json";

async function main() {
  try {
    const coordinates = await Controller.getLatLon("london");
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
  UI.init();
  // const weatherData = await Controller.processJson(sampleJson);
  // console.log(weatherData);
  // UI.renderCurrentWeather(weatherData.location, weatherData.current);
  // UI.renderyWeeklyWeather(weatherData.week);
  // UI.setDayOrNight();
}

main();
