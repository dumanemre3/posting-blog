import _Post_Blog_Logo from "../images/_Post_Blog_Logo.svg";
import React, { useState, useEffect } from "react";
import { usePosition } from "use-position";
import axios from "axios";
import ReactWeather, { useOpenWeather } from "react-open-weather";
const Weather = () => {
  const [weather, setWeather] = useState();
  const { latitude, longitude } = usePosition();

  const { data, isLoading, errorMessage } = useOpenWeather({
    key: process.env.REACT_APP_WEATHER_DATA,
    lat: latitude,
    lon: longitude,
    //lat: "48.137154",
    //lon: "11.576124",
    lang: "en",
    unit: "metric", // values are (metric, standard, imperial)
  });
  // const getWeatherData = async (lat, lon) => {
  //   const key = ;
  //   try {
  //     const { data } = await axios.get(
  //       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
  //     );
  //     console.log("=>data", data);
  //     setWeather(data);
  //   } catch {
  //     console.log("Veriler çekilemedi.");
  //   }
  // };

  return (
    <div>
      <header className="flex justify-between items-center p-4 border-b border-gray-extraLight text-white">
        <span className="ml-3 font-serif font-bold text- italic hover:not-italic mt-2">
          Weather
        </span>
        <img
          src={_Post_Blog_Logo}
          alt=""
          className="w-10 h-10 rounded-t-lg"
        ></img>
      </header>
      <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel="Turkey"
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
        showForecast
      />
    </div>
  );
};

export default Weather;

// <div>
//   <header className="flex justify-between items-center p-4 border-b border-gray-extraLight">
//     <span className="ml-3 font-serif font-bold text- italic hover:not-italic mt-2">
//       Weather
//     </span>
//     <img
//       src={PostingBlogLogo}
//       alt=""
//       className="w-10 h-10 rounded-t-lg"
//     ></img>
//   </header>
//   <div className="fw-bold mt-5">HAVA DURUMU BİLGİLERİ</div>
//   <div className="mt-5">
//     <div>
//       <h2 className="mt-3">
//         ENLEM KOORDİNATLARI:{" "}
//         {latitude === undefined ? "Veri Bekleniyor" : latitude}
//       </h2>
//       <h2 className="mt-3">
//         BOYLAM KORDİNATLARI:{" "}
//         {longitude === undefined ? "Veri Bekleniyor" : longitude}
//       </h2>
//       <h2 className="mt-3">
//         KORDİNAT BÖLGESİ:{" "}
//         {weather &&
//           (weather.name === undefined ? "Veri Bekleniyor" : weather.name)}
//       </h2>
//       <h2 className="mt-3">
//         HAVA SICAKLIĞI:{" "}
//         {weather &&
//           (weather.main.temp === undefined
//             ? "Veri Bekleniyor"
//             : weather.main.temp)}
//       </h2>
//       <h2 className="mt-3">
//         HİSSEDİLEN HAVA SICAKLIĞI:{" "}
//         {weather &&
//           (weather.main.feels_like === undefined
//             ? "Veri Bekleniyor"
//             : weather.main.feels_like)}
//       </h2>
//       <h2 className="mt-3">
//         NEM:{" "}
//         {weather &&
//           (weather.main.humidity === undefined
//             ? "Veri Bekleniyor"
//             : weather.main.humidity)}
//       </h2>
//       <h2 className="mt-3">
//         RÜZGAR HIZI:{" "}
//         {weather &&
//           (weather.wind.speed === undefined
//             ? "Veri Bekleniyor"
//             : weather.wind.speed)}
//       </h2>
//       <h2 className="mt-3">
//         DURUMU:{" "}
//         {weather &&
//           weather.weather.map((data) => {
//             return (
//               data.description.charAt(0).toUpperCase() +
//               data.description.substring(1)
//             );
//           })}
//       </h2>
//     </div>
//   </div>
// </div>
