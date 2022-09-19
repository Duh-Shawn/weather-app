class Controller {
  static key = "c1ccbf3721ccaefd1ca2a9daf263a40d";

  static async getLatLon(location) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${Controller.key}`
      );
      const json = await response.json();
      return { lat: json[0].lat, lon: json[0].lon };
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  static async getWeather(location) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${Controller.key}`
      );
      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err);
    }
    return null;
  }

  static async getWeatherAtCoordinates(lat, lon) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${Controller.key}`
      );
      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err);
    }
    return null;
  }
}

export default Controller;
