import { createApiClient } from "./client"
import type { WeatherData } from "./types"

const client = createApiClient("weather")

export async function getMatchWeather(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  const data = await client.get("/current.json", {
    q: `${latitude},${longitude}`,
  })

  return {
    temperature: data.current.temp_c,
    humidity: data.current.humidity,
    windSpeed: data.current.wind_kph,
    precipitation: data.current.precip_mm,
    condition: data.current.condition.text,
  }
}

export async function getWeatherForecast(
  latitude: number,
  longitude: number,
  days: number = 7
) {
  return client.get("/forecast.json", {
    q: `${latitude},${longitude}`,
    days: days.toString(),
  })
}