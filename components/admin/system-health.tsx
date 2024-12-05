```typescript
"use client"

import { useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { LineChart } from "@/components/charts/line-chart"
import { useAdminStore } from "@/lib/admin/store"
import { collectSystemMetrics } from "@/lib/admin/metrics"

export function SystemHealth() {
  const { metrics, settings, updateMetrics } = useAdminStore()

  useEffect(() => {
    const updateSystemMetrics = () => {
      updateMetrics(collectSystemMetrics())
    }

    updateSystemMetrics()
    const interval = setInterval(updateSystemMetrics, 5000)

    return () => clearInterval(interval)
  }, [updateMetrics])

  if (!metrics) return null

  const getStatusColor = (value: number, threshold: number) => {
    if (value >= threshold) return "destructive"
    if (value >= threshold * 0.8) return "warning"
    return "success"
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              CPU Usage
            </CardTitle>
            <Badge
              variant={getStatusColor(
                metrics.cpu,
                settings.alertThresholds.cpu
              )}
            >
              {metrics.cpu.toFixed(1)}%
            </Badge>
          </CardHeader>
          <CardContent>
            <Progress
              value={metrics.cpu}
              className="h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Memory Usage
            </CardTitle>
            <Badge
              variant={getStatusColor(
                metrics.memory,
                settings.alertThresholds.memory
              )}
            >
              {metrics.memory.toFixed(1)}%
            </Badge>
          </CardHeader>
          <CardContent>
            <Progress
              value={metrics.memory}
              className="h-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Storage Usage
            </CardTitle>
            <Badge
              variant={getStatusColor(
                metrics.storage,
                settings.alertThresholds.storage
              )}
            >
              {metrics.storage.toFixed(1)}%
            </Badge>
          </CardHeader>
          <CardContent>
            <Progress
              value={metrics.storage}
              className="h-2"
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Load</CardTitle>
            <CardDescription>
              Active users and request rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Active Users
                  </p>
                  <Badge variant="outline">
                    {metrics.activeUsers}
                  </Badge>
                </div>
                <Progress
                  value={(metrics.activeUsers / 100) * 100}
                  className="h-2"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Requests per Minute
                  </p>
                  <Badge variant="outline">
                    {metrics.requestsPerMinute}
                  </Badge>
                </div>
                <Progress
                  value={(metrics.requestsPerMinute / 1000) * 100}
                  className="h-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Rate</CardTitle>
            <CardDescription>
              System errors and exceptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                Current Error Rate
              </p>
              <Badge
                variant={getStatusColor(
                  metrics.errorRate,
                  settings.alertThresholds.errorRate
                )}
              >
                {metrics.errorRate.toFixed(2)}%
              </Badge>
            </div>
            <Progress
              value={(metrics.errorRate / 10) * 100}
              className="mt-2 h-2"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```