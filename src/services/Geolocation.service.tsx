import { createContext, useEffect, useState } from "react";

type GeolocationContextProviderProps = {
  children: React.ReactNode;
};

type GeolocationContextType = {
  hasLoadedPermission: boolean;
  canAccessGeolocation: boolean;
  latitude?: number;
  longitude?: number;
};

export const GeolocationContext = createContext({} as GeolocationContextType);

export const GeolocationContextProvider = ({
  children,
}: GeolocationContextProviderProps) => {
  const defaultData: GeolocationContextType = {
    canAccessGeolocation: false,
    hasLoadedPermission: false,
  };

  const [data, setData] = useState(defaultData);

  useEffect(() => {
    const setDeniedData = () =>
      setData({
        ...defaultData,
        hasLoadedPermission: true,
      });

    if (!navigator.geolocation) {
      setDeniedData();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) =>
        setData({
          hasLoadedPermission: true,
          canAccessGeolocation: true,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      (error) => {
        console.error(error);
        setDeniedData();
      }
    );
  }, []);
  return (
    <GeolocationContext.Provider value={data}>
      {children}
    </GeolocationContext.Provider>
  );
};
