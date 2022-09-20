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
      return err;
    }
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
      return err;
    }
  }

  static async getWeatherAtCoordinates(lat, lon) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${Controller.key}`
      );
      const json = await response.json();
      return json;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static async processJson(json) {
    if (json !== null && json !== undefined) {
      //const location = await

      const current = {
        description: json.current.weather[0].description,
        icon: json.current.weather[0].icon,
        currentTemp: json.current.temp,
        feelsLike: json.current.feels_like,
        wind: json.current.wind_speed,
        humidity: json.current.humidity,
      };

      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const week = [];

      json.daily.forEach((element) => {
        const date = new Date(element.dt * 1000);
        const dayValue = date.getDay();
        const day = {
          weekday: weekdays[dayValue],
          description: element.weather[0].description,
          icon: element.weather[0].icon,
          high: element.temp.max,
          low: element.temp.min,
        };
        week.push({ day });
      });
      week.shift(); // remove first day of the week since we are referencing to it as current day

      return { current, week };
    }
    return null;
  }
}

export default Controller;
