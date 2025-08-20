"use client";

import "./globals.css";
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
import {
  LocationSearcherContext,
  LocationSearcherContextProvider,
} from "@/services/LocationSearcher.service";
import { OptionProps } from "@/components/SearchBar/_components/Option";
import { City } from "@/utils/constants/capitals";

function HomePageContent() {
  const [searchValue, setSearchValue] = useState("");
  const [searchOptions, setSearchOptions] = useState<OptionProps[]>([]);

  const [forecastData, setForecastData] = useState<CityForecast[]>();
  const [focusedCity, setFocusedCity] = useState<CityForecast>();
  const [showFocusedCity, setShowFocusedCity] = useState(true);
  const [showGeolocationNotAllowedHint, setShowGeolocationNotAllowedHint] =
    useState(false);

  const geoContext = useContext(GeolocationContext);
  const weatherContext = useContext(WeatherForecastContext);
  const locationContext = useContext(LocationSearcherContext);

  useEffect(() => {
    checkGeolocationPermission();
  }, [geoContext]);

  useEffect(() => {
    requestForecast();
  }, [geoContext.cities]);

  useEffect(() => {
    initFocusedData();
  }, [weatherContext]);

  const searchCities = async (value: string) => {
    if (value.length < 3) return;

    const result = await locationContext.searchLocation(value);

    setSearchOptions(
      result.map((x, i) => ({
        id: i,
        onClick: searchCity,
        value: x,
      }))
    );
  };

  const initFocusedData = () => {
    if (!weatherContext.cachedData?.length) return;

    updateFocusedCity(weatherContext.cachedData[0]);
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

    const permissions = [
      hasLoadedPermission,
      canAccessGeolocation,
      geoContext.cities.length,
    ];

    if (permissions.some((x) => !x)) return;

    const forecastData = await weatherContext.requestMainCitiesForecast();

    setForecastData(forecastData);
  };

  const searchCity = async (city: City) => {
    setSearchValue("");

    updateFocusedCity(undefined);
    weatherContext
      .requestWeatherForecast([city])
      .then((x) => updateFocusedCity(x[0]));
  };

  const updateFocusedCity = (cityForecast?: CityForecast) => {
    setFocusedCity(cityForecast);

    setShowFocusedCity(true);
  };

  return (
    <div className={styles.body}>
      <header>
        <h1>Weather Forecast</h1>
        {showFocusedCity && (
          <CurrentLocationInfo
            city={focusedCity}
            onClose={() => setShowFocusedCity(false)}
          />
        )}
        <SearchBar
          value={searchValue}
          setValue={(value) => {
            setSearchValue(value);
            searchCities(value);
          }}
          options={searchOptions}
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
    <LocationSearcherContextProvider>
      <WeatherForecastContextProvider>
        <HomePageContent />
      </WeatherForecastContextProvider>
    </LocationSearcherContextProvider>
  );
}
// ...existing code...
