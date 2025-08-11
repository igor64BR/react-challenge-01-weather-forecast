import "@/app/globals.css";
import styles from "./style.module.css";
import { FunctionComponent } from "react";
import { CityForecast } from "@/services/WeatherForecast.service";
import CloseIcon from "@/icon/CloseIcon";
import ArrowUp from "@/icon/ArrowUp";
import ArrowDown from "@/icon/ArrowDown";

interface CurrentLocationInfoProps {
  city: CityForecast;
}

const CurrentLocationInfo: FunctionComponent<CurrentLocationInfoProps> = ({
  city,
}) => {
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <span>
          <span>{city.name}, </span>
          <span>{city.state} -&nbsp;</span>
          <span>{city.country}</span>
        </span>
        <div>
          <CloseIcon />
        </div>
      </div>
      <div className={styles.content}>
        <section className={styles.mainInfo}>
          <h1>{Math.round(city.temperature)}°C</h1>
          {/* TODO: Deixar dinamico */}
          <h1>Nublado</h1>
        </section>
        <section className={styles.otherInfoContainer}>
          <div className={styles.minMaxTemp}>
            <div>
              <ArrowDown />
              <span>{Math.round(city.min)}°C</span>
            </div>
            <div>
              <ArrowUp />
              <span>{Math.round(city.max)}°C</span>
            </div>
          </div>
          <div className={styles.otherInfo}>
            <span>Feels Like:</span>
            <span>{Math.round(city.apparentTemperature)}°C</span>
          </div>
          <div className={styles.otherInfo}>
            <span>Wind:</span>
            <span>{Math.round(city.windSpeed)}km/h</span>
          </div>
          <div className={styles.otherInfo}>
            <span>Humidity:</span>
            <span>{city.humidity}%</span>
          </div>
        </section>
        <section className={styles.footer}>
          {city.dailyForecast.map((df) => (
            <div className={styles.dailyForecast}>
              <h3>{df.dayName}</h3>
              <span className={styles.minMaxTemp}>
                <span>{Math.round(df.min)}°</span>
                <span>{Math.round(df.max)}°</span>
              </span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CurrentLocationInfo;
