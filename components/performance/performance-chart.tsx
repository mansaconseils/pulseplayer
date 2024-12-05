"use client"

import { useRef } from "react"
import { ChartContainer } from "@/components/charts/chart-container"
import { InteractiveLineChart } from "@/components/charts/interactive-line-chart"
import { exportChartAsImage, exportChartData } from "@/lib/charts/export"

const performanceData = [
  {
    date: "Mon",
    rating: 8.5,
    teamAvg: 7.2,
    leagueAvg: 7.0,
  },
  {
    date: "Tue",
    rating: 8.8,
    teamAvg: 7.4,
    leagueAvg: 7.1,
  },
  {
    date: "Wed",
    rating: 8.2,
    teamAvg: 7.3,
    leagueAvg: 7.0,
  },
  {
    date: "Thu",
    rating: 9.0,
    teamAvg: 7.5,
    leagueAvg: 7.2,
  },
  {
    date: "Fri",
    rating: 8.7,
    teamAvg: 7.6,
    leagueAvg: 7.1,
  },
]

const series = [
  { key: "rating", name: "Player Rating", color: "hsl(var(--primary))" },
  { key: "teamAvg", name: "Team Average", color: "hsl(var(--chart-2))" },
  { key: "leagueAvg", name: "League Average", color: "hsl(var(--chart-3))" },
]

export function PerformanceChart() {
  const chartRef = useRef<HTMLDivElement>(null)

  const handleExport = () => {
    if (chartRef.current) {
      exportChartAsImage(chartRef.current, "performance-chart")
      exportChartData(performanceData, "performance-data")
    }
  }

  return (
    <ChartContainer
      title="Performance Comparison"
      description="Player performance vs team and league averages"
      onExport={handleExport}
    >
      <div ref={chartRef}>
        <InteractiveLineChart
          data={performanceData}
          series={series}
          xAxisKey="date"
          height={350}
        />
      </div>
    </ChartContainer>
  )
}