const key = "0b405e45394070668f8bdacc3cabfa28";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

async function getLocationFromLatLon(lat, lon) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${key}`
    );
    const json = await response.json();
    return json[0];
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getLatLon(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${key}`
    );
    const json = await response.json();
    return json[0];
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}`
    );
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getWeatherAtCoordinates(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`
    );
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    return err;
  }
}

function processLocation(json) {
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

function processCurrentWeather(json) {
  //  process current weather data
  try {
    const current = {
      description: json.current.weather[0].description,
      icon: json.current.weather[0].icon,
      currentTemp: json.current.temp,
      feelsLike: json.current.feels_like,
      wind: json.current.wind_speed,
      humidity: json.current.humidity
    };
    return current;
  } catch (err) {
    console.log(err);
    return err;
  }
}

function processWeeklyWeather(json) {
  try {
    // process weathly weather data
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
    // week.shift(); // remove first day of the week since we are referencing to it as current day
    week[0].day.weekday = "Today";
    return week;
  } catch (err) {
    console.log(err);
    return err;
  }
}

function processHourlyWeather(json) {
  // 48 hours of weather data pulled from api
  const dataCount = 48;

  const currentDate = new Date();
  const hours = currentDate.getHours();
  const hoursLeftToday = 24 - hours;
  const hourlyList = json.hourly;

  // return array to collect the days 48 hours of data is split upon
  const days = [];

  // array containing api data for remaining hours in the current day
  const today = [];
  for (let i = 0; i < hoursLeftToday; i++) {
    today.push(hourlyList[i]);
  }
  days.push(today);

  // compute if multiple days worth of data still exists from API
  const daysLeft = (dataCount - hoursLeftToday) / 24;
  // has been found that less than 48 hours of data remains - only 1 day's worth
  if (daysLeft <= 1) {
    const dayOne = [];
    for (let i = hoursLeftToday; i < dataCount; i++) {
      dayOne.push(hourlyList[i]);
    }
    days.push(dayOne);
    // has been found that more than 48 hours of data remains- must be split across two days
  } else {
    const dayOne = [];
    for (let i = hoursLeftToday; i < hoursLeftToday + 24; i++) {
      dayOne.push(hourlyList[i]);
    }
    days.push(dayOne);

    const dayTwo = [];
    for (let i = hoursLeftToday + 24; i < dataCount; i++) {
      dayTwo.push(hourlyList[i]);
    }
    days.push(dayTwo);
  }
  return days;
}

async function processJson(weatherJSON, locationJSON) {
  const location = await processLocation(locationJSON);
  const current = await processCurrentWeather(weatherJSON);
  const weekly = await processWeeklyWeather(weatherJSON);
  const hourly = await processHourlyWeather(weatherJSON);
  return { location, current, weekly, hourly };
}

export {
  getLatLon,
  getLocationFromLatLon,
  getWeatherAtCoordinates,
  processJson,
  processLocation,
  processCurrentWeather,
  processWeeklyWeather,
  processHourlyWeather,
};
