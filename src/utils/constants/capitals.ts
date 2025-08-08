export type Capital = {
  name: string;
  latitude: number;
  longitude: number;
};

const capitals: Capital[] = [
  { name: "Rio de Janeiro", latitude: -22.9068, longitude: -43.1729 },
  { name: "São Paulo", latitude: -23.5475, longitude: -46.6361 },
  { name: "Belo Horizonte", latitude: -19.9208, longitude: -43.9378 },
  { name: "Brasília", latitude: -15.7797, longitude: -47.9297 },
  { name: "Belém", latitude: -1.4558, longitude: -48.5044 },
  { name: "Salvador", latitude: -12.9756, longitude: -38.4909 },
  { name: "Curitiba", latitude: -25.4278, longitude: -49.2731 },
  { name: "Fortaleza", latitude: -3.7172, longitude: -38.5431 },
  { name: "Vitória", latitude: -20.3194, longitude: -40.3467 },
  { name: "Aracaju", latitude: -10.9111, longitude: -37.0717 },
  { name: "Boa Vista", latitude: 2.8197, longitude: -60.6733 },
  { name: "Campo Grande", latitude: -20.4428, longitude: -54.6464 },
  { name: "Cuiabá", latitude: -15.5961, longitude: -56.0967 },
  { name: "Florianópolis", latitude: -27.5967, longitude: -48.5492 },
  { name: "Goiânia", latitude: -16.6786, longitude: -49.2539 },
  { name: "João Pessoa", latitude: -7.115, longitude: -34.863 },
  { name: "Macapá", latitude: 0.0389, longitude: -51.0664 },
  { name: "Maceió", latitude: -9.6658, longitude: -35.7353 },
  { name: "Manaus", latitude: -3.1019, longitude: -60.025 },
  { name: "Natal", latitude: -5.795, longitude: -35.2094 },
  { name: "Palmas", latitude: -10.2128, longitude: -48.3603 },
  { name: "Porto Alegre", latitude: -30.0318, longitude: -51.2065 },
  { name: "Porto Velho", latitude: -8.7619, longitude: -63.9039 },
  { name: "Recife", latitude: -8.0539, longitude: -34.8811 },
  { name: "Rio Branco", latitude: -9.9747, longitude: -67.8099 },
  { name: "São Luís", latitude: -2.5297, longitude: -44.3028 },
  { name: "Teresina", latitude: -5.0892, longitude: -42.8019 },
];

export default capitals;

export const getCapitalsByClosests = (coords: {
  latitude: number;
  longitude: number;
}): Promise<Capital[]> => {
  const capitalsWithDistance: Promise<Capital & { distance: number }>[] = [];

  for (const capital of capitals) {
    capitalsWithDistance.push(
      new Promise((resolve) => {
        const distX = capital.longitude - coords.longitude;
        const distY = capital.latitude - coords.latitude;
        const distance = Math.sqrt(distX ** 2 + distY ** 2);
        resolve({ ...capital, distance });
      })
    );
  }

  return Promise.all(capitalsWithDistance).then((results) => {
    return results
      .sort((a, b) => a.distance - b.distance)
      .map((capital) => capital as Capital);
  });
};