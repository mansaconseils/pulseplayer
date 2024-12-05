"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { CustomXAxis, CustomYAxis } from "@/components/charts/custom-axis"
import { LineSeries } from "@/components/charts/line-series"

const trendData = [
  { date: "Mon", articles: 180, sentiment: 75, credibility: 82 },
  { date: "Tue", articles: 220, sentiment: 78, credibility: 85 },
  { date: "Wed", articles: 195, sentiment: 72, credibility: 80 },
  { date: "Thu", articles: 250, sentiment: 80, credibility: 84 },
  { date: "Fri", articles: 280, sentiment: 85, credibility: 86 },
  { date: "Sat", articles: 260, sentiment: 82, credibility: 85 },
  { date: "Sun", articles: 245, sentiment: 80, credibility: 83 },
]

export function CoverageTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Coverage Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CustomXAxis dataKey="date" />
              <CustomYAxis />
              <Tooltip />
              <LineSeries
                dataKey="articles"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
              />
              <LineSeries
                dataKey="sentiment"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
              />
              <LineSeries
                dataKey="credibility"
                stroke="hsl(var(--chart-3))"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}