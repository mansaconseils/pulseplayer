"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Trophy, TrendingUp, TrendingDown } from "lucide-react"

const advancedMetrics = [
  { name: "Speed", value: 85, previous: 82 },
  { name: "Stamina", value: 78, previous: 75 },
  { name: "Agility", value: 92, previous: 88 },
  { name: "Strength", value: 75, previous: 73 },
  { name: "Balance", value: 88, previous: 85 },
]

export function AdvancedMetrics() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Advanced Performance Metrics</CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            Elite Level
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={advancedMetrics} className="[&_.recharts-polar-grid-angle-line]:stroke-border">
                <PolarGrid className="stroke-border" />
                <PolarAngleAxis
                  dataKey="name"
                  className="text-xs fill-muted-foreground"
                />
                <Radar
                  name="Current"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            {advancedMetrics.map((metric) => {
              const trend = ((metric.value - metric.previous) / metric.previous) * 100
              const TrendIcon = trend >= 0 ? TrendingUp : TrendingDown
              return (
                <div key={metric.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{metric.name}</p>
                    <p className="text-sm text-muted-foreground">Current: {metric.value}</p>
                  </div>
                  <Badge variant={trend >= 0 ? "default" : "destructive"} className="flex items-center gap-1">
                    <TrendIcon className="h-3 w-3" />
                    {trend.toFixed(1)}%
                  </Badge>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}