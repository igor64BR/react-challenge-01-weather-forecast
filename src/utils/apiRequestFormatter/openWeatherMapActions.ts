export default () => {
  const apiKey = process.env.NEXT_PUBLIC_GEOCODING_API_KEY;
  const baseUrl = "http://api.openweathermap.org/geo/1.0";

  return {
    requestCurrentLocation: async (lat: number, lon: number) => {
      const url = `${baseUrl}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;

      return await fetch(url).then((x) => x.json()).then(x => x[0]);
    },

    requestLocationSearch: async (location: string, limit: number = 5) => {
        const url = `${baseUrl}/direct?q=${location}&limit=${limit}&appid=${apiKey}`;

        return await fetch(url).then((x) => x.json());
    }
  };
};
