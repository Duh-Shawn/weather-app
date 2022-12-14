import { utcToZonedTime } from "date-fns-tz";

const key = "0b405e45394070668f8bdacc3cabfa28";

const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function getLocationFromLatLon(lat, lon) {
  try {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${key}`);
    const json = await response.json();
    return json[0];
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getLatLon(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${key}`);
    const json = await response.json();
    return json[0];
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getWeather(location) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}`);
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    return err;
  }
}

async function getWeatherAtCoordinates(lat, lon) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`);
    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err);
    return err;
  }
}

function processLocation(json) {
  let location;
  const regionNamesInEnglish = new Intl.DisplayNames(["en"], {
    type: "region",
  });
  try {
    if (json.country === "US") {
      location = {
        value: `${json.name}, ${json.state}`,
      };
    } else {
      location = {
        value: `${json.name}, ${regionNamesInEnglish.of(json.country)}`,
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
      humidity: json.current.humidity,
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

    week[0].day.weekday = "Today";
    return week;
  } catch (err) {
    console.log(err);
    return err;
  }
}

function formatTime(unixTime) {
  const date = new Date(unixTime * 1000);
  let hours = date.getHours();
  let ampm;
  if (hours >= 12) {
    ampm = "pm";
  } else {
    ampm = "am";
  }
  hours = ((hours + 11) % 12) + 1;
  return hours + ampm;
}

function convertCurrentTimeByTimeZone(unixTime, timeZone) {
  // convert UTC unixTime value in milliseconds to designated timezone time in seconds
  return utcToZonedTime(unixTime * 1000, timeZone) / 1000;
}

function processHourlyWeather(json) {
  let hours;
  const sameTimeZone = json.timezone === Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (!sameTimeZone) {
    hours = utcToZonedTime(json.current.dt * 1000, json.timezone).getHours();
  } else {
    hours = new Date().getHours();
  }

  // 48 hours of weather data pulled from api
  const dataCount = 48;

  const hoursLeftToday = 24 - hours;
  const hourlyList = json.hourly;

  // return array to collect the days 48 hours of data is split upon
  const days = [];

  // array containing api data for remaining hours in the current day
  const today = [];
  for (let i = 0; i < hoursLeftToday; i++) {
    // if the hourly results come from a different time zone than the user's browser. Convert the time zone for the forecasted location.
    if (!sameTimeZone) {
      hourlyList[i].dt = convertCurrentTimeByTimeZone(hourlyList[i].dt, json.timezone);
    }
    today.push(hourlyList[i]);
  }
  days.push(today);

  // compute if multiple days worth of data still exists from API
  const daysLeft = (dataCount - hoursLeftToday) / 24;

  // has been found that less than 48 hours of data remains - only 1 day's worth
  if (daysLeft <= 1) {
    const dayTwo = [];
    for (let i = hoursLeftToday; i < dataCount; i++) {
      if (!sameTimeZone) {
        hourlyList[i].dt = convertCurrentTimeByTimeZone(hourlyList[i].dt, json.timezone);
      }
      dayTwo.push(hourlyList[i]);
    }
    days.push(dayTwo);

    // has been found that more than 48 hours of data remains- must be split across two days
  } else {
    const dayTwo = [];
    for (let i = hoursLeftToday; i < hoursLeftToday + 24; i++) {
      if (!sameTimeZone) {
        hourlyList[i].dt = convertCurrentTimeByTimeZone(hourlyList[i].dt, json.timezone);
      }
      dayTwo.push(hourlyList[i]);
    }
    days.push(dayTwo);

    const dayThree = [];
    for (let i = hoursLeftToday + 24; i < dataCount; i++) {
      if (!sameTimeZone) {
        hourlyList[i].dt = convertCurrentTimeByTimeZone(hourlyList[i].dt, json.timezone);
      }
      dayThree.push(hourlyList[i]);
    }
    days.push(dayThree);
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
  formatTime,
};
