class Controller {
  static key = "0b405e45394070668f8bdacc3cabfa28";

  static weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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
      // use returned lat and lon to fetch and process location data
      let location;
      try {
        const locationData = await fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${json.lat}&lon=${json.lon}&limit=1&appid=${Controller.key}`
        );
        const locationJson = await locationData.json();
        if ("state" in locationJson[0]) {
          location = {
            value: `${locationJson[0].name}, ${locationJson[0].state}`,
          };
        } else {
          location = {
            value: `${locationJson[0].name}, ${locationJson[0].country}`,
          };
        }
      } catch (err) {
        console.log(err);
      }
      //  process current weather data
      const current = {
        description: json.current.weather[0].description,
        icon: json.current.weather[0].icon,
        currentTemp: json.current.temp,
        feelsLike: json.current.feels_like,
        wind: json.current.wind_speed,
        humidity: json.current.humidity,
      };

      // process weathly weather data
      const week = [];
      json.daily.forEach((element) => {
        const date = new Date(element.dt * 1000);
        const dayValue = date.getDay();
        const day = {
          weekday: Controller.weekdays[dayValue],
          description: element.weather[0].description,
          icon: element.weather[0].icon,
          high: element.temp.max,
          low: element.temp.min,
        };
        week.push({ day });
      });
      week.shift(); // remove first day of the week since we are referencing to it as current day
      return { location, current, week };
    }
    return null;
  }
}

export default Controller;
