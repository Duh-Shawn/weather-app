import UI from "./ui";
import Controller from "./controller";
import sampleJson from "./sample.json";

async function main() {
  // UI.init();
  const weatherData = await Controller.processJson(sampleJson);
  console.log(weatherData);
  UI.renderCurrentWeather(weatherData.location, weatherData.current);
}

main();
