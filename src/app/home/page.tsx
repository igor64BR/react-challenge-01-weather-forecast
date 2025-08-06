"use client";

import LensIcon from "@/icon/LensIcon";
import "../globals.css";
import styles from "./page.module.css";

export default function HomePage() {
  const searchCity = () => {};

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
    </div>
  );
}
