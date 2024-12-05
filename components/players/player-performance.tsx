"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { CustomXAxis, CustomYAxis } from "@/components/charts/custom-axis"
import { LineSeries } from "@/components/charts/line-series"

interface PlayerPerformanceProps {
  playerId: string
}

export function PlayerPerformance({ playerId }: PlayerPerformanceProps) {
  // Mock data - replace with actual API call
  const performanceData = [
    { match: "1", rating: 8.5, teamAvg: 7.2 },
    { match: "2", rating: 7.8, teamAvg: 7.4 },
    { match: "3", rating: 8.2, teamAvg: 7.1 },
    { match: "4", rating: 9.0, teamAvg: 7.5 },
    { match: "5", rating: 8.7, teamAvg: 7.3 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Ratings</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CustomXAxis dataKey="match" />
            <CustomYAxis />
            <Tooltip />
            <LineSeries
              dataKey="rating"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
            />
            <LineSeries
              dataKey="teamAvg"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}