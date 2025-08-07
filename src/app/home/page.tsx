"use client";

import LensIcon from "@/icon/LensIcon";
import "../globals.css";
import styles from "./page.module.css";
import backgroundStyles from "./background.module.css";
import { useContext, useEffect, useState } from "react";
import WeatherType from "@/Enums/WeatherType";
import {
  GeolocationContext,
  GeolocationContextProvider,
} from "@/services/Geolocation.service";
import HintInfo from "@/components/Hint/HintInfo/HintInfo";

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
  const [showGeolocationNotAllowedHint, setShowGeolocationNotAllowedHint] =
    useState(false);

  const context = useContext(GeolocationContext);

  const searchCity = () => {
    console.log(searchValue);
  };

  useEffect(() => {
    renderGeolocationNotAllowedHint();
  }, [context]);

  const renderGeolocationNotAllowedHint = () => {
    if (!context.hasLoadedPermission) return;

    setShowGeolocationNotAllowedHint(!context.canAccessGeolocation);
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
            <tr>
              <td>33C</td>
              <td>33C</td>
              <td>Rio de Janeiro</td>
            </tr>
            <tr>
              <td>33C</td>
              <td>33C</td>
              <td>Rio de Janeiro</td>
            </tr>
            <tr>
              <td>33C</td>
              <td>33C</td>
              <td>Rio de Janeiro</td>
            </tr>
            <tr>
              <td>33C</td>
              <td>33C</td>
              <td>Rio de Janeiro</td>
            </tr>
            <tr>
              <td>33C</td>
              <td>33C</td>
              <td>Rio de Janeiro</td>
            </tr>
            <tr>
              <td>33C</td>
              <td>33C</td>
              <td>Rio de Janeiro</td>
            </tr>
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
    <GeolocationContextProvider>
      <HomePageContent />
    </GeolocationContextProvider>
  );
}
