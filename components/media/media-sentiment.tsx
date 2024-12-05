"use client"

import { LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { CustomXAxis, CustomYAxis } from "@/components/charts/custom-axis"
import { LineSeries } from "@/components/charts/line-series"

const sentimentData = [
  { date: "Mon", positive: 65, negative: 35, neutral: 45 },
  { date: "Tue", positive: 72, negative: 28, neutral: 48 },
  { date: "Wed", positive: 68, negative: 32, neutral: 42 },
  { date: "Thu", positive: 75, negative: 25, neutral: 50 },
  { date: "Fri", positive: 70, negative: 30, neutral: 45 },
  { date: "Sat", positive: 80, negative: 20, neutral: 55 },
  { date: "Sun", positive: 78, negative: 22, neutral: 52 },
]

export function MediaSentiment() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={sentimentData}>
        <CustomXAxis dataKey="date" />
        <CustomYAxis />
        <Tooltip />
        <LineSeries
          dataKey="positive"
          stroke="hsl(var(--chart-1))"
        />
        <LineSeries
          dataKey="negative"
          stroke="hsl(var(--destructive))"
        />
        <LineSeries
          dataKey="neutral"
          stroke="hsl(var(--muted-foreground))"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}