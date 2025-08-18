import { createContext, useContext, useState } from "react";
import {
  GeolocationContext,
  GeolocationContextProvider,
} from "./Geolocation.service";
import { fetchWeatherApi } from "openmeteo";
import { City, Coordinates } from "@/utils/constants/capitals";
import { WeekdayContext, WeekdayContextProvider } from "./Weekday.service";

export type CityForecast = City & {
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
  requestMainCitiesForecast: () => Promise<CityForecast[]>;
  requestWeatherForecast:
    | ((coords: City) => Promise<CityForecast>)
    | ((coords: City[]) => Promise<CityForecast[]>);
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

  const formatResponse = (city: City, data: any): CityForecast => {
    const forecastDays = 4;
    const days = weekdayContext.getDaysFromToday(forecastDays);

    const latitude = data.latitude();
    const longitude = data.longitude();

    const current = data.current()!;
    const daily = data.daily()!;

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

    return {
      name: city.name,
      country: city.country,
      state: city.state,
      latitude: latitude,
      longitude: longitude,
      min: dailyForecast[0].min,
      max: dailyForecast[0].max,
      temperature: current.variables(0)!.value(),
      apparentTemperature: current.variables(1)!.value(),
      windSpeed: current.variables(2)!.value(),
      humidity: current.variables(3)!.value(),
      dailyForecast,
    };
  };

  async function requestWeatherForecast(coords: City): Promise<CityForecast>;
  async function requestWeatherForecast(
    coords: City[]
  ): Promise<CityForecast[]>;
  async function requestWeatherForecast(
    coords: City | City[]
  ): Promise<CityForecast | CityForecast[]> {
    const paramsFields = {
      daily: ["temperature_2m_max", "temperature_2m_min"],
      current: [
        "temperature_2m",
        "apparent_temperature",
        "wind_speed_10m",
        "relative_humidity_2m",
      ],
      timezone: "auto",
    };

    const params = Array.isArray(coords)
      ? {
          latitude: coords.map((x) => x.latitude),
          longitude: coords.map((x) => x.longitude),
          ...paramsFields,
        }
      : {
          latitude: coords.latitude,
          longitude: coords.longitude,
          ...paramsFields,
        };

    const url = "https://api.open-meteo.com/v1/forecast";
    const responses = await fetchWeatherApi(url, params);

    if (!Array.isArray(coords)) return formatResponse(coords, responses[0]);

    const outputData: CityForecast[] = [];

    for (const response of responses) {
      const index = responses.indexOf(response);

      const formattedData = formatResponse(coords[index], response);

      outputData.push(formattedData);
    }

    return outputData;
  }

  const requestMainCitiesForecast = async (): Promise<CityForecast[]> => {
    const { position, cities } = geolocationContext;
    if (!position || !cities.length)
      throw new Error("Failed to retrieve cities for forecast");

    const outputData = await requestWeatherForecast(cities);

    setCachedData(outputData);

    return outputData;
  };

  return (
    <WeatherForecastContext.Provider
      value={{
        requestMainCitiesForecast,
        requestWeatherForecast,
        cachedData,
      }}
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
