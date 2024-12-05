import { ApiConfig } from "./types"

export const API_CONFIGS: Record<string, ApiConfig> = {
  SPORTS_DATA: {
    source: "sports_data",
    baseUrl: "https://api.sportsdataapi.com/v1",
    apiKey: process.env.SPORTS_DATA_API_KEY || "",
    enabled: true,
    refreshInterval: 60000, // 1 minute
  },
  WEATHER: {
    source: "weather",
    baseUrl: "https://api.weatherapi.com/v1",
    apiKey: process.env.WEATHER_API_KEY || "",
    enabled: true,
    refreshInterval: 300000, // 5 minutes
  },
  SOCIAL_MEDIA: {
    source: "social_media",
    baseUrl: "https://api.social-aggregator.com/v1",
    apiKey: process.env.SOCIAL_API_KEY || "",
    enabled: true,
    refreshInterval: 120000, // 2 minutes
  },
  NEWS: {
    source: "news",
    baseUrl: "https://api.newsapi.org/v2",
    apiKey: process.env.NEWS_API_KEY || "",
    enabled: true,
    refreshInterval: 300000, // 5 minutes
  },
}

export const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 5000,
}