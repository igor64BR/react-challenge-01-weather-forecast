import { createContext, useContext, useState } from "react";
import {
  GeolocationContext,
  GeolocationContextProvider,
} from "./Geolocation.service";
import { fetchWeatherApi } from "openmeteo";
import { Capital } from "@/utils/constants/capitals";
import { WeekdayContext, WeekdayContextProvider } from "./Weekday.service";

export type CityForecast = Capital & {
  state: string;
  country: string;
  temperature: number;
  min: number;
  max: number;
  apparentTemperature: number;
  windSpeed: number;
  humidity: number;
  dailyForecast: dailyForecast[];
};

type dailyForecast = {
  min: number;
  max: number;
  dayName: string;
};

type WeatherForecastContextProviderProps = {
  children: React.ReactNode;
};

type WeatherForecastContextType = {
  requestWeatherForecast: () => Promise<CityForecast[]>;
  cachedData?: CityForecast[];
};

export const WeatherForecastContext = createContext(
  {} as WeatherForecastContextType
);

const WeatherForecastContextProviderProps = ({
  children,
}: WeatherForecastContextProviderProps) => {
  const geolocationContext = useContext(GeolocationContext);
  const weekdayContext = useContext(WeekdayContext);

  const [cachedData, setCachedData] = useState<CityForecast[]>();

  const requestWeatherForecast = async (): Promise<CityForecast[]> => {
    const { position, cities } = geolocationContext;
    if (!position || !cities.length)
      throw new Error("Failed to retrieve cities for forecast");

    const params = {
      latitude: cities.map((x) => x.latitude),
      longitude: cities.map((x) => x.longitude),
      daily: ["temperature_2m_max", "temperature_2m_min"],
      current: [
        "temperature_2m",
        "apparent_temperature",
        "wind_speed_10m",
        "relative_humidity_2m",
      ],
      timezone: "auto",
    };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    const outputData: CityForecast[] = [];

    const forecastDays = 4;

    const days = weekdayContext.getDaysFromToday(forecastDays);

    for (const response of responses) {
      const index = responses.indexOf(response);

      const latitude = response.latitude();
      const longitude = response.longitude();

      const current = response.current()!;
      const daily = response.daily()!;

      const maxTemps = daily.variables(0)!.valuesArray()!;
      const minTemps = daily.variables(1)!.valuesArray()!;

      const dailyForecast: dailyForecast[] = [];

      for (let i = 0; i < forecastDays; i++) {
        const max = maxTemps[i + 1];
        const min = minTemps[i + 1];

        dailyForecast.push({
          dayName: days[i],
          max,
          min,
        });
      }

      outputData.push({
        latitude: latitude,
        longitude: longitude,
        min: dailyForecast[0].min,
        max: dailyForecast[0].max,
        name: cities[index].name,
        temperature: current.variables(0)!.value(),
        apparentTemperature: current.variables(1)!.value(),
        windSpeed: current.variables(2)!.value(),
        humidity: current.variables(3)!.value(),
        country: cities[index].country,
        dailyForecast,
        state: cities[index].state,
      });
    }

    setCachedData(outputData);

    return outputData;
  };

  return (
    <WeatherForecastContext.Provider
      value={{ requestWeatherForecast, cachedData }}
    >
      {children}
    </WeatherForecastContext.Provider>
  );
};

export const WeatherForecastContextProvider = ({
  children,
}: WeatherForecastContextProviderProps) => {
  return (
    <GeolocationContextProvider>
      <WeekdayContextProvider>
        <WeatherForecastContextProviderProps>
          {children}
        </WeatherForecastContextProviderProps>
      </WeekdayContextProvider>
    </GeolocationContextProvider>
  );
};
