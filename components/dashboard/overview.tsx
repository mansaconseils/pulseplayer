"use client"

import { LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { performanceData } from "@/lib/chart-data"
import { CustomXAxis, CustomYAxis } from "@/components/charts/custom-axis"
import { LineSeries } from "@/components/charts/line-series"

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={performanceData}>
        <CustomXAxis dataKey="name" />
        <CustomYAxis tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <LineSeries
          dataKey="performance"
          stroke="hsl(var(--primary))"
        />
        <LineSeries
          dataKey="social"
          stroke="hsl(var(--chart-2))"
        />
        <LineSeries
          dataKey="media"
          stroke="hsl(var(--chart-3))"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}