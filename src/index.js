import Controller from "./controller";

async function main() {
  const coordinates = await Controller.getLatLon("sterling");
  const weatherJson = await Controller.getWeatherAtCoordinates(
    coordinates.lat,
    coordinates.lon
  );
  console.log(Controller.processJson(weatherJson));
}

main();
