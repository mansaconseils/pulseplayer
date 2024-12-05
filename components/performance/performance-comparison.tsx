"use client"

import { BarChart, ResponsiveContainer, Tooltip } from "recharts"
import { CustomXAxis, CustomYAxis } from "@/components/charts/custom-axis"
import { Bar } from "recharts"

const comparisonData = [
  { metric: "Goals", player: 1.8, average: 1.2 },
  { metric: "Assists", player: 1.2, average: 0.8 },
  { metric: "Shots", player: 3.5, average: 2.8 },
  { metric: "Passes", player: 45.2, average: 35.6 },
]

export function PerformanceComparison() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={comparisonData}>
        <CustomXAxis dataKey="metric" />
        <CustomYAxis />
        <Tooltip />
        <Bar
          dataKey="player"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="average"
          fill="hsl(var(--muted))"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}