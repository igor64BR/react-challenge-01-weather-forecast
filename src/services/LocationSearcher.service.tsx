import openWeatherMapActions from "@/utils/apiRequestFormatter/openWeatherMapActions";
import { City } from "@/utils/constants/capitals";
import { createContext } from "react";

type LocationSearcherContextProviderProps = {
  children: React.ReactNode;
};

type LocationSearcherContextType = {
  searchLocation: (location: string, limit?: number) => Promise<City[]>;
};

export const LocationSearcherContext = createContext(
  {} as LocationSearcherContextType
);

export const LocationSearcherContextProvider = ({
  children,
}: LocationSearcherContextProviderProps) => {
  const openWeatherMap = openWeatherMapActions();

  const searchLocation = async (
    location: string,
    limit: number = 5
  ): Promise<City[]> => {
    const response = await openWeatherMap.requestLocationSearch(
      location,
      limit
    );

    return response.map((city) => ({
      name: city.local_names?.pt ?? city.name,
      state: city.state,
      country: city.country,
      latitude: city.lat,
      longitude: city.lon,
    }));
  };

  return (
    <LocationSearcherContext.Provider value={{ searchLocation }}>
      {children}
    </LocationSearcherContext.Provider>
  );
};
