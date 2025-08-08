import { createContext, useContext } from "react";
import {
  GeolocationContext,
  GeolocationContextProvider,
} from "./Geolocation.service";
import { fetchWeatherApi } from "openmeteo";
import { Capital } from "@/utils/constants/capitals";

export type CityForecast = Capital & {
  min: number;
  max: number;
};

type WeatherForecastContextProviderProps = {
  children: React.ReactNode;
};

type WeatherForecastContextType = {
  requestWeatherForecast: () => Promise<CityForecast[]>;
};

export const WeatherForecastContext = createContext(
  {} as WeatherForecastContextType
);

const WeatherForecastContextProviderProps = ({
  children,
}: WeatherForecastContextProviderProps) => {
  const geolocationContext = useContext(GeolocationContext);

  const requestWeatherForecast = async (): Promise<CityForecast[]> => {
    const { position, cities } = geolocationContext;
    if (!position || !cities.length)
      throw new Error("Failed to retrieve cities for forecast");

    const allCities: Capital[] = [
      {
        name: "Current",
        ...position,
      },
      ...cities,
    ];

    const params = {
      latitude: allCities.map((x) => x.latitude),
      longitude: allCities.map((x) => x.longitude),
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

    for (const response of responses) {
      const index = responses.indexOf(response);

      // Attributes for timezone and location
      const latitude = response.latitude();
      const longitude = response.longitude();
      const elevation = response.elevation();
      const timezone = response.timezone();
      const timezoneAbbreviation = response.timezoneAbbreviation();
      const utcOffsetSeconds = response.utcOffsetSeconds();

      // console.log(
      //   `\nCoordinates: ${latitude}°N ${longitude}°E`,
      //   `\nElevation: ${elevation}m asl`,
      //   `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
      //   `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`
      // );

      const current = response.current()!;
      const daily = response.daily()!;

      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature_2m: current.variables(0)!.value(),
          apparent_temperature: current.variables(1)!.value(),
          wind_speed_10m: current.variables(2)!.value(),
          relative_humidity_2m: current.variables(3)!.value(),
        },
        daily: {
          time: [
            ...Array(
              (Number(daily.timeEnd()) - Number(daily.time())) /
                daily.interval()
            ),
          ].map(
            (_, i) =>
              new Date(
                (Number(daily.time()) +
                  i * daily.interval() +
                  utcOffsetSeconds) *
                  1000
              )
          ),
          temperature_2m_max: daily.variables(0)!.valuesArray(),
          temperature_2m_min: daily.variables(1)!.valuesArray(),
        },
      };

      outputData.push({
        latitude: latitude,
        longitude: longitude,
        min: daily.variables(1)!.valuesArray()![0],
        max: daily.variables(0)?.valuesArray()![0]!,
        name: allCities[index].name,
      });

      // 'weatherData' now contains a simple structure with arrays with datetime and weather data
      // console.log(
      //   `\Current data for ${
      //     [
      //       {
      //         name: "Alegre",
      //         latitude: position.latitude,
      //         longitude: position.longitude,
      //       },
      //       ...cities,
      //     ][index].name
      //   }`,
      //   `\nCurrent time: ${weatherData.current.time}`,
      //   `\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
      //   `\nCurrent apparent_temperature: ${weatherData.current.apparent_temperature}`,
      //   `\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
      //   `\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`
      // );
    }

    return outputData;
  };

  return (
    <WeatherForecastContext.Provider value={{ requestWeatherForecast }}>
      {children}
    </WeatherForecastContext.Provider>
  );
};

export const WeatherForecastContextProvider = ({
  children,
}: WeatherForecastContextProviderProps) => {
  return (
    <GeolocationContextProvider>
      <WeatherForecastContextProviderProps>
        {children}
      </WeatherForecastContextProviderProps>
    </GeolocationContextProvider>
  );
};
