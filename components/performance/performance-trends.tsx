"use client"

import { LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { CustomXAxis, CustomYAxis } from "@/components/charts/custom-axis"
import { LineSeries } from "@/components/charts/line-series"

const trendData = [
  { month: "Jan", goals: 1.2, assists: 0.8 },
  { month: "Feb", goals: 1.5, assists: 1.1 },
  { month: "Mar", goals: 1.8, assists: 1.3 },
  { month: "Apr", goals: 1.6, assists: 1.0 },
  { month: "May", goals: 2.0, assists: 1.5 },
]

export function PerformanceTrends() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={trendData}>
        <CustomXAxis dataKey="month" />
        <CustomYAxis />
        <Tooltip />
        <LineSeries
          dataKey="goals"
          stroke="hsl(var(--primary))"
        />
        <LineSeries
          dataKey="assists"
          stroke="hsl(var(--chart-2))"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}