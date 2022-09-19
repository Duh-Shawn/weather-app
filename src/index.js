import Controller from "./controller";

async function main() {
  const coordinates = await Controller.getLatLon("london");
  console.log(
    await Controller.getWeatherAtCoordinates(coordinates.lat, coordinates.lon)
  );
}

main();
