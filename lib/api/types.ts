import { z } from "zod"

export const apiSourceSchema = z.enum([
  "sports_data",
  "weather",
  "social_media",
  "news",
])

export const apiConfigSchema = z.object({
  source: apiSourceSchema,
  baseUrl: z.string().url(),
  apiKey: z.string(),
  enabled: z.boolean(),
  refreshInterval: z.number(),
})

export type ApiSource = z.infer<typeof apiSourceSchema>
export type ApiConfig = z.infer<typeof apiConfigSchema>

export const weatherDataSchema = z.object({
  temperature: z.number(),
  humidity: z.number(),
  windSpeed: z.number(),
  precipitation: z.number(),
  condition: z.string(),
})

export type WeatherData = z.infer<typeof weatherDataSchema>

export const matchConditionsSchema = z.object({
  venue: z.string(),
  weather: weatherDataSchema,
  pitch: z.object({
    condition: z.string(),
    type: z.string(),
  }),
})

export type MatchConditions = z.infer<typeof matchConditionsSchema>