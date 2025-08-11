import { createContext, useEffect, useState } from "react";
import capitals, {
  Capital,
  getCapitalsByClosests,
} from "@/utils/constants/capitals";

type GeolocationContextProviderProps = {
  children: React.ReactNode;
};

type GeolocationContextType = {
  permissions: GeolocationPermissions;
  position?: GeolocationPosition;
  cities: Capital[];
};

type GeolocationPermissions = {
  hasLoadedPermission: boolean;
  canAccessGeolocation: boolean;
};

type GeolocationPosition = {
  latitude: number;
  longitude: number;
};

export const GeolocationContext = createContext({} as GeolocationContextType);

export const GeolocationContextProvider = ({
  children,
}: GeolocationContextProviderProps) => {
  const defaultPermissions: GeolocationPermissions = {
    canAccessGeolocation: false,
    hasLoadedPermission: false,
  };

  const [permissions, setPermissions] = useState(defaultPermissions);
  const [position, setPosition] = useState<GeolocationPosition | undefined>();
  const [cities, setCities] = useState<Capital[]>([]);

  useEffect(() => {
    requestGeolocation();
  }, []);

  useEffect(() => {
    retrieveClosestLocations();
  }, [position, permissions]);

  const requestGeolocation = () => {
    const setDeniedData = () =>
      setPermissions({
        ...defaultPermissions,
        hasLoadedPermission: true,
      });

    if (!navigator.geolocation) {
      setDeniedData();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPermissions({
          hasLoadedPermission: true,
          canAccessGeolocation: true,
        });

        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
        setDeniedData();
      }
    );
  };

  const retrieveClosestLocations = async () => {
    if (!permissions.hasLoadedPermission) return;

    if (!permissions.canAccessGeolocation) {
      setCities(capitals);
      return;
    }

    const currentLocation = await retrieveCurrentLocationInfo();

    const capitalsOrderedByDistance = await getCapitalsByClosests(position!);

    setCities([
      currentLocation,
      ...capitalsOrderedByDistance,
    ]);
  };

  const retrieveCurrentLocationInfo = async (): Promise<Capital> => {
    const { latitude, longitude } = position!;

    const data = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    ).then((x) => x.json());

    const currentCityName = data.address.city || data.address.town || data.address.village;
    const country = data.address.country;
    const state = data.address.state;

    return {
      latitude,
      longitude,
      name: currentCityName,
      country,
      state,
    }
  }

  return (
    <GeolocationContext.Provider
      value={{
        permissions,
        position,
        cities: cities,
      }}
    >
      {children}
    </GeolocationContext.Provider>
  );
};
