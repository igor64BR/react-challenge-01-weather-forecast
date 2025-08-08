"use client";

import LensIcon from "@/icon/LensIcon";
import "../globals.css";
import styles from "./page.module.css";
import backgroundStyles from "./background.module.css";
import { useContext, useEffect, useState } from "react";
import WeatherType from "@/Enums/WeatherType";
import { GeolocationContext } from "@/services/Geolocation.service";
import HintInfo from "@/components/Hint/HintInfo/HintInfo";
import {
  CityForecast,
  WeatherForecastContext,
  WeatherForecastContextProvider,
} from "@/services/WeatherForecast.service";

interface CurrentDataProps {
  city: string;
  currentTemp: number;
  type: WeatherType;
  minTemp: number;
  maxTemp: number;
  thermicSensation: number;
  windSpeed: number;
  humidity: number;
}

function HomePageContent() {
  const [searchValue, setSearchValue] = useState("");
  const [forecastData, setForecastData] = useState<CityForecast[]>();
  const [showGeolocationNotAllowedHint, setShowGeolocationNotAllowedHint] =
    useState(false);

  const geoContext = useContext(GeolocationContext);
  const weatherContext = useContext(WeatherForecastContext);

  const searchCity = async () => {
    const response = await weatherContext.requestWeatherForecast();

    console.log(response);
  };

  useEffect(() => {
    checkGeolocationPermission();
  }, [geoContext]);

  useEffect(() => {
    requestForecast();
  }, [geoContext.cities]);

  const checkGeolocationPermission = () => {
    if (!geoContext.permissions.hasLoadedPermission) return;

    setShowGeolocationNotAllowedHint(
      !geoContext.permissions.canAccessGeolocation
    );
  };

  const requestForecast = async () => {
    const { canAccessGeolocation, hasLoadedPermission } =
      geoContext.permissions;

    if (!hasLoadedPermission) return;

    if (!canAccessGeolocation) return;

    if (!geoContext.cities.length) return;

    const forecastData = await weatherContext.requestWeatherForecast();

    setForecastData(forecastData);
  };

  return (
    <div className={styles.body}>
      <header>
        <h1>Weather Forecast</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search for your city"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <label htmlFor="search" id={styles.lensIconContainer}>
            <button onClick={() => searchCity()}>
              <LensIcon />
            </button>
          </label>
        </div>
      </header>
      <main>
        <h1>Capitals</h1>
        <table>
          <thead>
            <tr>
              <th>Min</th>
              <th>Max</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {forecastData?.map((x, i) => (
              <tr key={i}>
                <td>{Math.round(x.min)}°C</td>
                <td>{Math.round(x.max)}°C</td>
                <td>{x.name}</td>
              </tr>
            )) ?? null}
          </tbody>
        </table>
      </main>

      {showGeolocationNotAllowedHint && (
        <HintInfo
          text="Please provide geolocation permission to retrieve weather data"
          onDismiss={() => setShowGeolocationNotAllowedHint(false)}
        />
      )}
      <div className={backgroundStyles.background}></div>
    </div>
  );
}

export default function HomePage() {
  return (
    <WeatherForecastContextProvider>
      <HomePageContent />
    </WeatherForecastContextProvider>
  );
}
