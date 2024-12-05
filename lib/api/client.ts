import { ApiConfig, ApiSource } from "./types"
import { API_CONFIGS, RETRY_CONFIG } from "./config"

class ApiClient {
  private config: ApiConfig
  private controller: AbortController | null = null

  constructor(source: ApiSource) {
    this.config = API_CONFIGS[source.toUpperCase()]
  }

  private async fetchWithRetry(
    endpoint: string,
    options: RequestInit = {},
    retryCount = 0
  ): Promise<any> {
    try {
      this.controller = new AbortController()
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
          ...options.headers,
        },
        signal: this.controller.signal,
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      if (retryCount < RETRY_CONFIG.maxRetries) {
        const delay = Math.min(
          RETRY_CONFIG.baseDelay * Math.pow(2, retryCount),
          RETRY_CONFIG.maxDelay
        )
        await new Promise(resolve => setTimeout(resolve, delay))
        return this.fetchWithRetry(endpoint, options, retryCount + 1)
      }
      throw error
    }
  }

  public async get(endpoint: string, params: Record<string, string> = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.fetchWithRetry(`${endpoint}?${queryString}`)
  }

  public async post(endpoint: string, data: any) {
    return this.fetchWithRetry(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  public abort() {
    if (this.controller) {
      this.controller.abort()
      this.controller = null
    }
  }
}

export const createApiClient = (source: ApiSource) => new ApiClient(source)