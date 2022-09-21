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
      return json[0];
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

  static processLocation(json) {
    let location;
    try {
      if ("state" in json) {
        location = {
          value: `${json.name}, ${json.state}`,
        };
      } else {
        location = {
          value: `${json.name}, ${json.country}`,
        };
      }
      return location;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static processCurrentWeather(json) {
    //  process current weather data
    try {
      const current = {
        description: json.current.weather[0].description,
        icon: json.current.weather[0].icon,
        currentTemp: json.current.temp,
        feelsLike: json.current.feels_like,
        wind: json.current.wind_speed,
        humidity: json.current.humidity,
      };
      return current;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static processWeeklyWeather(json) {
    try {
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
      return week;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static async processJson(WeatherJSON, locationJSON) {
    const location = await Controller.processLocation(locationJSON);
    const current = await Controller.processCurrentWeather(WeatherJSON);
    const week = await Controller.processWeeklyWeather(WeatherJSON);

    return { location, current, week };
  }
}

export default Controller;
