export interface IConfig {
  port: string;
  database: {
    host: string;
    port: string;
    name: string;
    user: string;
    password: string;
  };
  pg: {
    database: string;
    user: string;
    password: string;
  };
  apiKey: string;
}

export type TGetDataPayload = {
  lat: string;
  lon: string;
  part?: string;
};

export interface IWeatherServiceResponse {
  coord: { lon: number; lat: number };
  weather: [[Object]];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: { speed: number; deg: number };
  clouds: { all: number };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
