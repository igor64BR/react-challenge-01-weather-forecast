"use client";

import "../globals.css";
import styles from "./page.module.css";
import backgroundStyles from "./background.module.css";
import { useContext, useEffect, useState } from "react";
import { GeolocationContext } from "@/services/Geolocation.service";
import HintInfo from "@/components/Hint/HintInfo/HintInfo";
import {
  CityForecast,
  WeatherForecastContext,
  WeatherForecastContextProvider,
} from "@/services/WeatherForecast.service";
import Loading from "@/components/Loading/Loading";
import CurrentLocationInfo from "./_components/CurrentLocationInfo/CurrentLocationInfo";
import SearchBar from "@/components/SearchBar/SearchBar";

function HomePageContent() {
  const [searchValue, setSearchValue] = useState("");
  const [forecastData, setForecastData] = useState<CityForecast[]>();
  const [focusedCity, setFocusedCity] = useState<CityForecast>();
  const [showGeolocationNotAllowedHint, setShowGeolocationNotAllowedHint] =
    useState(false);

  const geoContext = useContext(GeolocationContext);
  const weatherContext = useContext(WeatherForecastContext);

  useEffect(() => {
    checkGeolocationPermission();
  }, [geoContext]);

  useEffect(() => {
    requestForecast();
  }, [geoContext.cities]);

  useEffect(() => {
    initFocusedData();
  }, [weatherContext]);

  const initFocusedData = () => {
    if (!weatherContext.cachedData?.length) return;

    setFocusedCity(weatherContext.cachedData[0]);
  };

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

    const forecastData = await weatherContext.requestMainCitiesForecast();

    setForecastData(forecastData);
  };

  const searchCity = async () => {
    const response = await weatherContext.requestMainCitiesForecast();

    console.log(response);
  };

  return (
    <div className={styles.body}>
      <header>
        <h1>Weather Forecast</h1>
        {focusedCity && <CurrentLocationInfo city={focusedCity} />}
        <SearchBar
          value={searchValue}
          setValue={setSearchValue}
          onSearch={searchCity}
        />
      </header>
      <main>
        <h1>Main Cities</h1>
        <div>
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
              ))}
            </tbody>
          </table>
          {!!forecastData?.length || (
            <div className={styles.loadingContainer}>
              <Loading size={2} />
            </div>
          )}
        </div>
      </main>

      {showGeolocationNotAllowedHint && (
        <HintInfo
          text="Please provide geolocation permission to retrieve weather data"
          onDismiss={() => setShowGeolocationNotAllowedHint(false)}
        />
      )}
      <div
        className={`${backgroundStyles.background} ${backgroundStyles.bg}`}
      ></div>
      <div
        className={`${backgroundStyles.backgroundFilter} ${backgroundStyles.bg}`}
      ></div>
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
