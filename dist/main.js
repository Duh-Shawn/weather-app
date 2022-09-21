/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Controller {\n  static key = \"0b405e45394070668f8bdacc3cabfa28\";\n\n  static weekdays = [\n    \"Sunday\",\n    \"Monday\",\n    \"Tuesday\",\n    \"Wednesday\",\n    \"Thursday\",\n    \"Friday\",\n    \"Saturday\",\n  ];\n\n  static async getLatLon(location) {\n    try {\n      const response = await fetch(\n        `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${Controller.key}`\n      );\n      const json = await response.json();\n      return { lat: json[0].lat, lon: json[0].lon };\n    } catch (err) {\n      console.log(err);\n      return err;\n    }\n  }\n\n  static async getWeather(location) {\n    try {\n      const response = await fetch(\n        `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${Controller.key}`\n      );\n      const json = await response.json();\n      return json;\n    } catch (err) {\n      console.log(err);\n      return err;\n    }\n  }\n\n  static async getWeatherAtCoordinates(lat, lon) {\n    try {\n      const response = await fetch(\n        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${Controller.key}`\n      );\n      const json = await response.json();\n      return json;\n    } catch (err) {\n      console.log(err);\n      return err;\n    }\n  }\n\n  static async processLocation(json) {\n    let location;\n    try {\n      // lat and lon to fetch and process location data\n      const locationData = await fetch(\n        `http://api.openweathermap.org/geo/1.0/reverse?lat=${json.lat}&lon=${json.lon}&limit=1&appid=${Controller.key}`\n      );\n      const locationJson = await locationData.json();\n      if (\"state\" in locationJson[0]) {\n        location = {\n          value: `${locationJson[0].name}, ${locationJson[0].state}`,\n        };\n      } else {\n        location = {\n          value: `${locationJson[0].name}, ${locationJson[0].country}`,\n        };\n      }\n      return location;\n    } catch (err) {\n      console.log(err);\n      return err;\n    }\n  }\n\n  static processCurrentWeather(json) {\n    //  process current weather data\n    try {\n      const current = {\n        description: json.current.weather[0].description,\n        icon: json.current.weather[0].icon,\n        currentTemp: json.current.temp,\n        feelsLike: json.current.feels_like,\n        wind: json.current.wind_speed,\n        humidity: json.current.humidity,\n      };\n      return current;\n    } catch (err) {\n      console.log(err);\n      return err;\n    }\n  }\n\n  static processWeeklyWeather(json) {\n    try {\n      // process weathly weather data\n      const week = [];\n      json.daily.forEach((element) => {\n        const date = new Date(element.dt * 1000);\n        const dayValue = date.getDay();\n        const day = {\n          weekday: Controller.weekdays[dayValue],\n          description: element.weather[0].description,\n          icon: element.weather[0].icon,\n          high: element.temp.max,\n          low: element.temp.min,\n        };\n        week.push({ day });\n      });\n      week.shift(); // remove first day of the week since we are referencing to it as current day\n      return week;\n    } catch (err) {\n      console.log(err);\n      return err;\n    }\n  }\n\n  static async processJson(json) {\n    const location = await Controller.processLocation(json);\n    const current = Controller.processCurrentWeather(json);\n    const week = Controller.processWeeklyWeather(json);\n\n    return { location, current, week };\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Controller);\n\n\n//# sourceURL=webpack:///./src/controller.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui */ \"./src/ui.js\");\n/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ \"./src/controller.js\");\n/* harmony import */ var _sample_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sample.json */ \"./src/sample.json\");\n\n\n\n\nasync function main() {\n  _ui__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init();\n  // const weatherData = await Controller.processJson(sampleJson);\n  // console.log(weatherData);\n  // UI.renderCurrentWeather(weatherData.location, weatherData.current);\n  // UI.renderyWeeklyWeather(weatherData.week);\n}\n\nmain();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ \"./src/controller.js\");\n/* harmony import */ var _sample_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sample.json */ \"./src/sample.json\");\n\r\n\r\n\r\nclass UI {\r\n  static form = document.querySelector(\"form\");\r\n\r\n  static search = document.querySelector(\"form input\");\r\n\r\n  static weeklyWeather = document.getElementById(\"weekly-weather\");\r\n\r\n  static renderCurrentWeather(locationJSON, currentWeatherJSON) {\r\n    const locationDiv = document.querySelector(\r\n      \".current-weather-container .location\"\r\n    );\r\n    locationDiv.innerHTML = `<p>${locationJSON.value}</p>`;\r\n\r\n    const leftDiv = document.querySelector(\".current-weather-container .left\");\r\n    leftDiv.innerHTML = `<p class=\"current-temp\">${currentWeatherJSON.currentTemp}&deg; F</p>\r\n    <div class=\"weather-condition\"><img src=\"http://openweathermap.org/img/wn/${currentWeatherJSON.icon}@2x.png\" class=\"icon\"></img>\r\n    <p class=\"description\">${currentWeatherJSON.description}</p><div>`;\r\n\r\n    const rightDiv = document.querySelector(\r\n      \".current-weather-container .right\"\r\n    );\r\n    rightDiv.innerHTML = `<div class=\"details\"><p class=\"feels-like\">Feels Like: ${currentWeatherJSON.feelsLike}&deg; F</p>\r\n    <p class=\"wind\">Wind: ${currentWeatherJSON.wind} MPH</p>\r\n    <p class=\"humidity\">Humidity: ${currentWeatherJSON.humidity} %</p></div>`;\r\n  }\r\n\r\n  static renderyWeeklyWeather(weekJSON) {\r\n    UI.weeklyWeather.innerHTML = \"\";\r\n    weekJSON.forEach((day) => {\r\n      const weekdayContainer = document.createElement(\"div\");\r\n      weekdayContainer.classList.add(\"weekday-weather-container\");\r\n\r\n      const dayOfWeek = document.createElement(\"div\");\r\n      dayOfWeek.classList.add(\"week-day\");\r\n      dayOfWeek.innerHTML = `<p>${day.day.weekday}</p>`;\r\n      weekdayContainer.appendChild(dayOfWeek);\r\n\r\n      const dayWeather = document.createElement(\"div\");\r\n      dayWeather.classList.add(\"day-weather\");\r\n      dayWeather.innerHTML = `<p class=\"high\">${day.day.high}&deg; F</p><p class=\"low\">${weekJSON[0].day.low}&deg; F</p>`;\r\n      weekdayContainer.appendChild(dayWeather);\r\n\r\n      const dayWeatherCondition = document.createElement(\"div\");\r\n      dayWeatherCondition.classList = \"day-condition\";\r\n      const weatherImage = new Image(100, 100);\r\n      weatherImage.src = `http://openweathermap.org/img/wn/${day.day.icon}@2x.png`;\r\n      dayWeatherCondition.appendChild(weatherImage);\r\n      weekdayContainer.appendChild(dayWeatherCondition);\r\n\r\n      UI.weeklyWeather.appendChild(weekdayContainer);\r\n    });\r\n  }\r\n\r\n  static async init() {\r\n    UI.form.addEventListener(\"submit\", async (e) => {\r\n      e.preventDefault();\r\n      // search field is not empty\r\n      if (UI.search.value !== \"\") {\r\n        try {\r\n          const coordinates = await _controller__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getLatLon(UI.search.value);\r\n          const weatherJson = await _controller__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getWeatherAtCoordinates(\r\n            coordinates.lat,\r\n            coordinates.lon\r\n          );\r\n          const weatherData = await _controller__WEBPACK_IMPORTED_MODULE_0__[\"default\"].processJson(weatherJson);\r\n          UI.renderCurrentWeather(weatherData.location, weatherData.current);\r\n          UI.renderyWeeklyWeather(weatherData.week);\r\n        } catch (err) {\r\n          console.log(err);\r\n        }\r\n      }\r\n    });\r\n  }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);\r\n\n\n//# sourceURL=webpack:///./src/ui.js?");

/***/ }),

/***/ "./src/sample.json":
/*!*************************!*\
  !*** ./src/sample.json ***!
  \*************************/
/***/ ((module) => {

eval("module.exports = JSON.parse('{\"lat\":41.7883,\"lon\":-89.6954,\"timezone\":\"America/Chicago\",\"timezone_offset\":-18000,\"current\":{\"dt\":1663613086,\"sunrise\":1663587788,\"sunset\":1663632126,\"temp\":79.23,\"feels_like\":79.23,\"pressure\":1016,\"humidity\":60,\"dew_point\":64.15,\"uvi\":5.46,\"clouds\":0,\"visibility\":10000,\"wind_speed\":4.61,\"wind_deg\":20,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}]},\"minutely\":[{\"dt\":1663613100,\"precipitation\":0},{\"dt\":1663613160,\"precipitation\":0},{\"dt\":1663613220,\"precipitation\":0},{\"dt\":1663613280,\"precipitation\":0},{\"dt\":1663613340,\"precipitation\":0},{\"dt\":1663613400,\"precipitation\":0},{\"dt\":1663613460,\"precipitation\":0},{\"dt\":1663613520,\"precipitation\":0},{\"dt\":1663613580,\"precipitation\":0},{\"dt\":1663613640,\"precipitation\":0},{\"dt\":1663613700,\"precipitation\":0},{\"dt\":1663613760,\"precipitation\":0},{\"dt\":1663613820,\"precipitation\":0},{\"dt\":1663613880,\"precipitation\":0},{\"dt\":1663613940,\"precipitation\":0},{\"dt\":1663614000,\"precipitation\":0},{\"dt\":1663614060,\"precipitation\":0},{\"dt\":1663614120,\"precipitation\":0},{\"dt\":1663614180,\"precipitation\":0},{\"dt\":1663614240,\"precipitation\":0},{\"dt\":1663614300,\"precipitation\":0},{\"dt\":1663614360,\"precipitation\":0},{\"dt\":1663614420,\"precipitation\":0},{\"dt\":1663614480,\"precipitation\":0},{\"dt\":1663614540,\"precipitation\":0},{\"dt\":1663614600,\"precipitation\":0},{\"dt\":1663614660,\"precipitation\":0},{\"dt\":1663614720,\"precipitation\":0},{\"dt\":1663614780,\"precipitation\":0},{\"dt\":1663614840,\"precipitation\":0},{\"dt\":1663614900,\"precipitation\":0},{\"dt\":1663614960,\"precipitation\":0},{\"dt\":1663615020,\"precipitation\":0},{\"dt\":1663615080,\"precipitation\":0},{\"dt\":1663615140,\"precipitation\":0},{\"dt\":1663615200,\"precipitation\":0},{\"dt\":1663615260,\"precipitation\":0},{\"dt\":1663615320,\"precipitation\":0},{\"dt\":1663615380,\"precipitation\":0},{\"dt\":1663615440,\"precipitation\":0},{\"dt\":1663615500,\"precipitation\":0},{\"dt\":1663615560,\"precipitation\":0},{\"dt\":1663615620,\"precipitation\":0},{\"dt\":1663615680,\"precipitation\":0},{\"dt\":1663615740,\"precipitation\":0},{\"dt\":1663615800,\"precipitation\":0},{\"dt\":1663615860,\"precipitation\":0},{\"dt\":1663615920,\"precipitation\":0},{\"dt\":1663615980,\"precipitation\":0},{\"dt\":1663616040,\"precipitation\":0},{\"dt\":1663616100,\"precipitation\":0},{\"dt\":1663616160,\"precipitation\":0},{\"dt\":1663616220,\"precipitation\":0},{\"dt\":1663616280,\"precipitation\":0},{\"dt\":1663616340,\"precipitation\":0},{\"dt\":1663616400,\"precipitation\":0},{\"dt\":1663616460,\"precipitation\":0},{\"dt\":1663616520,\"precipitation\":0},{\"dt\":1663616580,\"precipitation\":0},{\"dt\":1663616640,\"precipitation\":0},{\"dt\":1663616700,\"precipitation\":0}],\"hourly\":[{\"dt\":1663610400,\"temp\":79.05,\"feels_like\":79.05,\"pressure\":1016,\"humidity\":57,\"dew_point\":62.53,\"uvi\":5.97,\"clouds\":0,\"visibility\":10000,\"wind_speed\":5.88,\"wind_deg\":48,\"wind_gust\":5.19,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663614000,\"temp\":79.23,\"feels_like\":79.23,\"pressure\":1016,\"humidity\":60,\"dew_point\":64.15,\"uvi\":5.46,\"clouds\":0,\"visibility\":10000,\"wind_speed\":5.99,\"wind_deg\":45,\"wind_gust\":5.03,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663617600,\"temp\":79.48,\"feels_like\":79.48,\"pressure\":1016,\"humidity\":56,\"dew_point\":62.42,\"uvi\":4.15,\"clouds\":0,\"visibility\":10000,\"wind_speed\":5.55,\"wind_deg\":48,\"wind_gust\":4.07,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663621200,\"temp\":79.72,\"feels_like\":79.72,\"pressure\":1015,\"humidity\":53,\"dew_point\":61.09,\"uvi\":2.54,\"clouds\":0,\"visibility\":10000,\"wind_speed\":5.44,\"wind_deg\":44,\"wind_gust\":3.94,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663624800,\"temp\":79.11,\"feels_like\":79.11,\"pressure\":1015,\"humidity\":52,\"dew_point\":59.99,\"uvi\":1.14,\"clouds\":0,\"visibility\":10000,\"wind_speed\":6.08,\"wind_deg\":59,\"wind_gust\":4.74,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663628400,\"temp\":76.1,\"feels_like\":76.23,\"pressure\":1014,\"humidity\":60,\"dew_point\":61.21,\"uvi\":0.32,\"clouds\":0,\"visibility\":10000,\"wind_speed\":6.17,\"wind_deg\":68,\"wind_gust\":8.59,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663632000,\"temp\":69.31,\"feels_like\":69.1,\"pressure\":1014,\"humidity\":67,\"dew_point\":57.9,\"uvi\":0,\"clouds\":0,\"visibility\":10000,\"wind_speed\":7.65,\"wind_deg\":79,\"wind_gust\":9.17,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663635600,\"temp\":66.97,\"feels_like\":66.67,\"pressure\":1014,\"humidity\":70,\"dew_point\":56.95,\"uvi\":0,\"clouds\":0,\"visibility\":10000,\"wind_speed\":7.92,\"wind_deg\":85,\"wind_gust\":10.49,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0},{\"dt\":1663639200,\"temp\":65.55,\"feels_like\":65.19,\"pressure\":1015,\"humidity\":72,\"dew_point\":56.39,\"uvi\":0,\"clouds\":0,\"visibility\":10000,\"wind_speed\":7.49,\"wind_deg\":83,\"wind_gust\":10.42,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0},{\"dt\":1663642800,\"temp\":64.62,\"feels_like\":64.2,\"pressure\":1015,\"humidity\":73,\"dew_point\":55.83,\"uvi\":0,\"clouds\":0,\"visibility\":10000,\"wind_speed\":6.78,\"wind_deg\":92,\"wind_gust\":8.5,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0},{\"dt\":1663646400,\"temp\":64.27,\"feels_like\":63.79,\"pressure\":1015,\"humidity\":72,\"dew_point\":55.18,\"uvi\":0,\"clouds\":3,\"visibility\":10000,\"wind_speed\":7.63,\"wind_deg\":110,\"wind_gust\":12.01,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0},{\"dt\":1663650000,\"temp\":63.57,\"feels_like\":63.07,\"pressure\":1015,\"humidity\":73,\"dew_point\":54.54,\"uvi\":0,\"clouds\":2,\"visibility\":10000,\"wind_speed\":7.14,\"wind_deg\":103,\"wind_gust\":11.32,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0},{\"dt\":1663653600,\"temp\":62.98,\"feels_like\":62.46,\"pressure\":1015,\"humidity\":74,\"dew_point\":54.25,\"uvi\":0,\"clouds\":2,\"visibility\":10000,\"wind_speed\":8.12,\"wind_deg\":95,\"wind_gust\":14.67,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0},{\"dt\":1663657200,\"temp\":62.46,\"feels_like\":61.88,\"pressure\":1015,\"humidity\":74,\"dew_point\":54.19,\"uvi\":0,\"clouds\":4,\"visibility\":10000,\"wind_speed\":9.15,\"wind_deg\":131,\"wind_gust\":21.12,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0.13},{\"dt\":1663660800,\"temp\":62.37,\"feels_like\":61.92,\"pressure\":1015,\"humidity\":77,\"dew_point\":55.13,\"uvi\":0,\"clouds\":19,\"visibility\":10000,\"wind_speed\":7.54,\"wind_deg\":127,\"wind_gust\":19.89,\"weather\":[{\"id\":500,\"main\":\"Rain\",\"description\":\"light rain\",\"icon\":\"10n\"}],\"pop\":0.38,\"rain\":{\"1h\":0.21}},{\"dt\":1663664400,\"temp\":61.34,\"feels_like\":60.98,\"pressure\":1014,\"humidity\":81,\"dew_point\":55.45,\"uvi\":0,\"clouds\":45,\"visibility\":10000,\"wind_speed\":8.9,\"wind_deg\":139,\"wind_gust\":24.25,\"weather\":[{\"id\":500,\"main\":\"Rain\",\"description\":\"light rain\",\"icon\":\"10n\"}],\"pop\":0.67,\"rain\":{\"1h\":0.4}},{\"dt\":1663668000,\"temp\":61.39,\"feels_like\":61.27,\"pressure\":1014,\"humidity\":86,\"dew_point\":57.09,\"uvi\":0,\"clouds\":46,\"visibility\":10000,\"wind_speed\":7.45,\"wind_deg\":116,\"wind_gust\":20.13,\"weather\":[{\"id\":500,\"main\":\"Rain\",\"description\":\"light rain\",\"icon\":\"10n\"}],\"pop\":0.87,\"rain\":{\"1h\":0.42}},{\"dt\":1663671600,\"temp\":60.58,\"feels_like\":60.57,\"pressure\":1014,\"humidity\":90,\"dew_point\":57.63,\"uvi\":0,\"clouds\":52,\"visibility\":10000,\"wind_speed\":7.81,\"wind_deg\":106,\"wind_gust\":17.85,\"weather\":[{\"id\":500,\"main\":\"Rain\",\"description\":\"light rain\",\"icon\":\"10n\"}],\"pop\":0.87,\"rain\":{\"1h\":0.37}},{\"dt\":1663675200,\"temp\":60.42,\"feels_like\":60.49,\"pressure\":1015,\"humidity\":92,\"dew_point\":57.94,\"uvi\":0,\"clouds\":47,\"visibility\":10000,\"wind_speed\":7.81,\"wind_deg\":107,\"wind_gust\":18.05,\"weather\":[{\"id\":500,\"main\":\"Rain\",\"description\":\"light rain\",\"icon\":\"10d\"}],\"pop\":0.83,\"rain\":{\"1h\":0.37}},{\"dt\":1663678800,\"temp\":62.85,\"feels_like\":62.92,\"pressure\":1014,\"humidity\":87,\"dew_point\":58.8,\"uvi\":0.31,\"clouds\":0,\"visibility\":10000,\"wind_speed\":10.25,\"wind_deg\":124,\"wind_gust\":23.82,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0.15},{\"dt\":1663682400,\"temp\":67.3,\"feels_like\":67.44,\"pressure\":1014,\"humidity\":79,\"dew_point\":60.46,\"uvi\":1.14,\"clouds\":0,\"visibility\":10000,\"wind_speed\":12.37,\"wind_deg\":140,\"wind_gust\":26.84,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0.05},{\"dt\":1663686000,\"temp\":72.59,\"feels_like\":72.93,\"pressure\":1013,\"humidity\":72,\"dew_point\":62.96,\"uvi\":2.53,\"clouds\":0,\"visibility\":10000,\"wind_speed\":13.91,\"wind_deg\":153,\"wind_gust\":22.68,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663689600,\"temp\":79.27,\"feels_like\":79.27,\"pressure\":1013,\"humidity\":64,\"dew_point\":65.91,\"uvi\":4.22,\"clouds\":0,\"visibility\":10000,\"wind_speed\":13.02,\"wind_deg\":168,\"wind_gust\":17.76,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663693200,\"temp\":84.99,\"feels_like\":87.22,\"pressure\":1011,\"humidity\":53,\"dew_point\":65.79,\"uvi\":5.56,\"clouds\":11,\"visibility\":10000,\"wind_speed\":12.48,\"wind_deg\":188,\"wind_gust\":17.72,\"weather\":[{\"id\":801,\"main\":\"Clouds\",\"description\":\"few clouds\",\"icon\":\"02d\"}],\"pop\":0},{\"dt\":1663696800,\"temp\":90.9,\"feels_like\":92.39,\"pressure\":1010,\"humidity\":41,\"dew_point\":63.81,\"uvi\":6.07,\"clouds\":10,\"visibility\":10000,\"wind_speed\":12.12,\"wind_deg\":212,\"wind_gust\":17.47,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663700400,\"temp\":93.85,\"feels_like\":94.66,\"pressure\":1010,\"humidity\":35,\"dew_point\":62.38,\"uvi\":5.57,\"clouds\":0,\"visibility\":10000,\"wind_speed\":12.08,\"wind_deg\":230,\"wind_gust\":17.4,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663704000,\"temp\":95.32,\"feels_like\":96.12,\"pressure\":1009,\"humidity\":33,\"dew_point\":61.74,\"uvi\":4.23,\"clouds\":0,\"visibility\":10000,\"wind_speed\":12.08,\"wind_deg\":240,\"wind_gust\":19.06,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663707600,\"temp\":96.35,\"feels_like\":97.3,\"pressure\":1008,\"humidity\":32,\"dew_point\":61.66,\"uvi\":2.57,\"clouds\":0,\"visibility\":10000,\"wind_speed\":11.32,\"wind_deg\":237,\"wind_gust\":19.93,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663711200,\"temp\":94.78,\"feels_like\":95.7,\"pressure\":1008,\"humidity\":34,\"dew_point\":62.33,\"uvi\":1.16,\"clouds\":0,\"visibility\":10000,\"wind_speed\":10.6,\"wind_deg\":233,\"wind_gust\":19.69,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663714800,\"temp\":89.17,\"feels_like\":90.45,\"pressure\":1007,\"humidity\":43,\"dew_point\":63.48,\"uvi\":0.32,\"clouds\":0,\"visibility\":10000,\"wind_speed\":8.28,\"wind_deg\":213,\"wind_gust\":16.13,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663718400,\"temp\":84.22,\"feels_like\":84.02,\"pressure\":1008,\"humidity\":43,\"dew_point\":59.5,\"uvi\":0,\"clouds\":0,\"visibility\":10000,\"wind_speed\":8.46,\"wind_deg\":210,\"wind_gust\":14.52,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663722000,\"temp\":82.22,\"feels_like\":81.88,\"pressure\":1008,\"humidity\":42,\"dew_point\":57.02,\"uvi\":0,\"clouds\":0,\"visibility\":10000,\"wind_speed\":8.77,\"wind_deg\":206,\"wind_gust\":19.71,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0},{\"dt\":1663725600,\"temp\":80.71,\"feels_like\":80.62,\"pressure\":1008,\"humidity\":42,\"dew_point\":55.53,\"uvi\":0,\"clouds\":0,\"visibility\":10000,\"wind_speed\":9.08,\"wind_deg\":205,\"wind_gust\":21.97,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0},{\"dt\":1663729200,\"temp\":79.43,\"feels_like\":79.43,\"pressure\":1008,\"humidity\":42,\"dew_point\":54.41,\"uvi\":0,\"clouds\":0,\"visibility\":10000,\"wind_speed\":9.26,\"wind_deg\":205,\"wind_gust\":26.35,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0},{\"dt\":1663732800,\"temp\":77.95,\"feels_like\":77.47,\"pressure\":1008,\"humidity\":43,\"dew_point\":53.98,\"uvi\":0,\"clouds\":0,\"visibility\":10000,\"wind_speed\":8.99,\"wind_deg\":209,\"wind_gust\":27.31,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0},{\"dt\":1663736400,\"temp\":76.1,\"feels_like\":75.67,\"pressure\":1008,\"humidity\":48,\"dew_point\":55.36,\"uvi\":0,\"clouds\":0,\"visibility\":10000,\"wind_speed\":9.82,\"wind_deg\":210,\"wind_gust\":31.83,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0},{\"dt\":1663740000,\"temp\":75.16,\"feels_like\":74.82,\"pressure\":1008,\"humidity\":52,\"dew_point\":56.17,\"uvi\":0,\"clouds\":0,\"visibility\":10000,\"wind_speed\":9.28,\"wind_deg\":233,\"wind_gust\":31.76,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0},{\"dt\":1663743600,\"temp\":74.86,\"feels_like\":74.53,\"pressure\":1007,\"humidity\":53,\"dew_point\":56.64,\"uvi\":0,\"clouds\":0,\"visibility\":10000,\"wind_speed\":10.18,\"wind_deg\":219,\"wind_gust\":35.14,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0.06},{\"dt\":1663747200,\"temp\":76.51,\"feels_like\":76.26,\"pressure\":1007,\"humidity\":51,\"dew_point\":57.24,\"uvi\":0,\"clouds\":0,\"visibility\":10000,\"wind_speed\":13.24,\"wind_deg\":237,\"wind_gust\":35.12,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0},{\"dt\":1663750800,\"temp\":74.07,\"feels_like\":73.9,\"pressure\":1007,\"humidity\":58,\"dew_point\":58.48,\"uvi\":0,\"clouds\":3,\"visibility\":10000,\"wind_speed\":11.14,\"wind_deg\":260,\"wind_gust\":31.63,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01n\"}],\"pop\":0},{\"dt\":1663754400,\"temp\":71.58,\"feels_like\":71.55,\"pressure\":1008,\"humidity\":66,\"dew_point\":59.59,\"uvi\":0,\"clouds\":23,\"visibility\":10000,\"wind_speed\":10.02,\"wind_deg\":275,\"wind_gust\":24.4,\"weather\":[{\"id\":801,\"main\":\"Clouds\",\"description\":\"few clouds\",\"icon\":\"02n\"}],\"pop\":0},{\"dt\":1663758000,\"temp\":69.44,\"feels_like\":69.6,\"pressure\":1009,\"humidity\":75,\"dew_point\":60.85,\"uvi\":0,\"clouds\":31,\"visibility\":10000,\"wind_speed\":10.71,\"wind_deg\":317,\"wind_gust\":26.66,\"weather\":[{\"id\":802,\"main\":\"Clouds\",\"description\":\"scattered clouds\",\"icon\":\"03n\"}],\"pop\":0},{\"dt\":1663761600,\"temp\":68.65,\"feels_like\":69.21,\"pressure\":1010,\"humidity\":85,\"dew_point\":63.93,\"uvi\":0,\"clouds\":27,\"visibility\":10000,\"wind_speed\":12.03,\"wind_deg\":337,\"wind_gust\":28.01,\"weather\":[{\"id\":802,\"main\":\"Clouds\",\"description\":\"scattered clouds\",\"icon\":\"03d\"}],\"pop\":0},{\"dt\":1663765200,\"temp\":70.05,\"feels_like\":70.7,\"pressure\":1011,\"humidity\":84,\"dew_point\":64.69,\"uvi\":0.29,\"clouds\":8,\"visibility\":10000,\"wind_speed\":14.12,\"wind_deg\":2,\"wind_gust\":31.12,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"pop\":0},{\"dt\":1663768800,\"temp\":71.38,\"feels_like\":71.47,\"pressure\":1012,\"humidity\":69,\"dew_point\":60.4,\"uvi\":1.07,\"clouds\":52,\"visibility\":10000,\"wind_speed\":15.03,\"wind_deg\":1,\"wind_gust\":29.3,\"weather\":[{\"id\":803,\"main\":\"Clouds\",\"description\":\"broken clouds\",\"icon\":\"04d\"}],\"pop\":0},{\"dt\":1663772400,\"temp\":72.61,\"feels_like\":72.01,\"pressure\":1013,\"humidity\":52,\"dew_point\":53.85,\"uvi\":2.4,\"clouds\":68,\"visibility\":10000,\"wind_speed\":15.73,\"wind_deg\":4,\"wind_gust\":24.7,\"weather\":[{\"id\":803,\"main\":\"Clouds\",\"description\":\"broken clouds\",\"icon\":\"04d\"}],\"pop\":0},{\"dt\":1663776000,\"temp\":73.99,\"feels_like\":73.26,\"pressure\":1014,\"humidity\":46,\"dew_point\":51.85,\"uvi\":3.3,\"clouds\":76,\"visibility\":10000,\"wind_speed\":14.65,\"wind_deg\":7,\"wind_gust\":20.87,\"weather\":[{\"id\":803,\"main\":\"Clouds\",\"description\":\"broken clouds\",\"icon\":\"04d\"}],\"pop\":0},{\"dt\":1663779600,\"temp\":75.2,\"feels_like\":74.44,\"pressure\":1014,\"humidity\":43,\"dew_point\":50.9,\"uvi\":4.35,\"clouds\":81,\"visibility\":10000,\"wind_speed\":12.82,\"wind_deg\":357,\"wind_gust\":17.38,\"weather\":[{\"id\":803,\"main\":\"Clouds\",\"description\":\"broken clouds\",\"icon\":\"04d\"}],\"pop\":0}],\"daily\":[{\"dt\":1663606800,\"sunrise\":1663587788,\"sunset\":1663632126,\"moonrise\":1663563840,\"moonset\":1663621920,\"moon_phase\":0.8,\"temp\":{\"day\":78.08,\"min\":61.21,\"max\":79.72,\"night\":64.27,\"eve\":76.1,\"morn\":63.45},\"feels_like\":{\"day\":78.26,\"night\":63.79,\"eve\":76.23,\"morn\":63.91},\"pressure\":1016,\"humidity\":57,\"dew_point\":61.63,\"wind_speed\":8.75,\"wind_deg\":50,\"wind_gust\":20,\"weather\":[{\"id\":501,\"main\":\"Rain\",\"description\":\"moderate rain\",\"icon\":\"10d\"}],\"clouds\":0,\"pop\":0.92,\"rain\":2.11,\"uvi\":5.97},{\"dt\":1663693200,\"sunrise\":1663674249,\"sunset\":1663718421,\"moonrise\":1663653600,\"moonset\":1663710780,\"moon_phase\":0.83,\"temp\":{\"day\":84.99,\"min\":60.42,\"max\":96.35,\"night\":77.95,\"eve\":89.17,\"morn\":60.58},\"feels_like\":{\"day\":87.22,\"night\":77.47,\"eve\":90.45,\"morn\":60.57},\"pressure\":1011,\"humidity\":53,\"dew_point\":65.79,\"wind_speed\":13.91,\"wind_deg\":153,\"wind_gust\":27.31,\"weather\":[{\"id\":500,\"main\":\"Rain\",\"description\":\"light rain\",\"icon\":\"10d\"}],\"clouds\":11,\"pop\":0.87,\"rain\":1.77,\"uvi\":6.07},{\"dt\":1663779600,\"sunrise\":1663760710,\"sunset\":1663804715,\"moonrise\":1663743660,\"moonset\":1663799220,\"moon_phase\":0.86,\"temp\":{\"day\":75.2,\"min\":59.72,\"max\":76.51,\"night\":59.72,\"eve\":68.72,\"morn\":69.44},\"feels_like\":{\"day\":74.44,\"night\":57.88,\"eve\":67.5,\"morn\":69.6},\"pressure\":1014,\"humidity\":43,\"dew_point\":50.9,\"wind_speed\":15.73,\"wind_deg\":4,\"wind_gust\":35.14,\"weather\":[{\"id\":803,\"main\":\"Clouds\",\"description\":\"broken clouds\",\"icon\":\"04d\"}],\"clouds\":81,\"pop\":0.06,\"uvi\":4.76},{\"dt\":1663866000,\"sunrise\":1663847172,\"sunset\":1663891010,\"moonrise\":1663833900,\"moonset\":1663887300,\"moon_phase\":0.9,\"temp\":{\"day\":62.13,\"min\":48.34,\"max\":64.45,\"night\":48.38,\"eve\":61.32,\"morn\":48.38},\"feels_like\":{\"day\":60.12,\"night\":45.75,\"eve\":59.56,\"morn\":45.61},\"pressure\":1022,\"humidity\":44,\"dew_point\":39.78,\"wind_speed\":13.87,\"wind_deg\":348,\"wind_gust\":24.67,\"weather\":[{\"id\":803,\"main\":\"Clouds\",\"description\":\"broken clouds\",\"icon\":\"04d\"}],\"clouds\":79,\"pop\":0,\"uvi\":5.51},{\"dt\":1663952400,\"sunrise\":1663933633,\"sunset\":1663977304,\"moonrise\":1663924200,\"moonset\":1663975200,\"moon_phase\":0.93,\"temp\":{\"day\":61.99,\"min\":44.85,\"max\":64.06,\"night\":50.88,\"eve\":59.22,\"morn\":44.85},\"feels_like\":{\"day\":60.01,\"night\":49.62,\"eve\":56.91,\"morn\":41.74},\"pressure\":1023,\"humidity\":45,\"dew_point\":40.06,\"wind_speed\":11.81,\"wind_deg\":185,\"wind_gust\":22.48,\"weather\":[{\"id\":500,\"main\":\"Rain\",\"description\":\"light rain\",\"icon\":\"10d\"}],\"clouds\":99,\"pop\":0.92,\"rain\":1.74,\"uvi\":3.88},{\"dt\":1664038800,\"sunrise\":1664020095,\"sunset\":1664063599,\"moonrise\":1664014560,\"moonset\":1664062920,\"moon_phase\":0.96,\"temp\":{\"day\":76.5,\"min\":49.28,\"max\":81.27,\"night\":63.9,\"eve\":67.46,\"morn\":50.67},\"feels_like\":{\"day\":75.72,\"night\":62.8,\"eve\":66.49,\"morn\":48.67},\"pressure\":1008,\"humidity\":40,\"dew_point\":50.65,\"wind_speed\":13.65,\"wind_deg\":288,\"wind_gust\":28.74,\"weather\":[{\"id\":800,\"main\":\"Clear\",\"description\":\"clear sky\",\"icon\":\"01d\"}],\"clouds\":0,\"pop\":0.76,\"uvi\":4},{\"dt\":1664125200,\"sunrise\":1664106557,\"sunset\":1664149894,\"moonrise\":1664104860,\"moonset\":1664150640,\"moon_phase\":0,\"temp\":{\"day\":74.77,\"min\":53.28,\"max\":74.77,\"night\":53.28,\"eve\":56.16,\"morn\":60.28},\"feels_like\":{\"day\":74.1,\"night\":52.63,\"eve\":55.65,\"morn\":58.93},\"pressure\":1007,\"humidity\":46,\"dew_point\":52.43,\"wind_speed\":16.58,\"wind_deg\":334,\"wind_gust\":30.71,\"weather\":[{\"id\":501,\"main\":\"Rain\",\"description\":\"moderate rain\",\"icon\":\"10d\"}],\"clouds\":62,\"pop\":0.81,\"rain\":3.06,\"uvi\":4},{\"dt\":1664211600,\"sunrise\":1664193019,\"sunset\":1664236189,\"moonrise\":1664195280,\"moonset\":1664238360,\"moon_phase\":0.03,\"temp\":{\"day\":64.09,\"min\":48.83,\"max\":64.09,\"night\":50.86,\"eve\":54.72,\"morn\":49.73},\"feels_like\":{\"day\":62.55,\"night\":49.41,\"eve\":53.31,\"morn\":44.83},\"pressure\":1019,\"humidity\":50,\"dew_point\":44.94,\"wind_speed\":14.83,\"wind_deg\":353,\"wind_gust\":29.77,\"weather\":[{\"id\":802,\"main\":\"Clouds\",\"description\":\"scattered clouds\",\"icon\":\"03d\"}],\"clouds\":38,\"pop\":0.01,\"uvi\":4}]}');\n\n//# sourceURL=webpack:///./src/sample.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;