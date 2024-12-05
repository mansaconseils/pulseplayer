"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { API_CONFIGS } from "@/lib/api/config"
import { Activity, Cloud, MessageCircle, Newspaper } from "lucide-react"

const API_ICONS = {
  sports_data: Activity,
  weather: Cloud,
  social_media: MessageCircle,
  news: Newspaper,
}

export function ApiStatus() {
  const [statuses, setStatuses] = useState<Record<string, boolean>>({})

  useEffect(() => {
    async function checkApiStatus(config: typeof API_CONFIGS[keyof typeof API_CONFIGS]) {
      try {
        const response = await fetch(`${config.baseUrl}/health`)
        return response.ok
      } catch {
        return false
      }
    }

    async function updateStatuses() {
      const newStatuses: Record<string, boolean> = {}
      for (const [key, config] of Object.entries(API_CONFIGS)) {
        if (config.enabled) {
          newStatuses[key] = await checkApiStatus(config)
        }
      }
      setStatuses(newStatuses)
    }

    updateStatuses()
    const interval = setInterval(updateStatuses, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(API_CONFIGS).map(([key, config]) => {
            const Icon = API_ICONS[config.source]
            const isOnline = statuses[key]
            
            return (
              <div
                key={key}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">
                    {key.split("_").map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    ).join(" ")}
                  </span>
                </div>
                <Badge variant={isOnline ? "default" : "destructive"}>
                  {isOnline ? "Online" : "Offline"}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}