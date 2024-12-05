"use client"

import {
  RadarChart as RechartsRadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts"
import { BaseChart } from "./base-chart"

interface RadarChartProps {
  title: string
  description?: string
  data: any[]
  dataKey: string
  color: string
  className?: string
  height?: number
  allowExport?: boolean
}

export function RadarChart({
  title,
  description,
  data,
  dataKey,
  color,
  className,
  height,
  allowExport,
}: RadarChartProps) {
  return (
    <BaseChart
      title={title}
      description={description}
      data={data}
      className={className}
      height={height}
      allowExport={allowExport}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={data} className="[&_.recharts-polar-grid-angle-line]:stroke-border">
          <PolarGrid className="stroke-border" />
          <PolarAngleAxis
            dataKey="name"
            className="text-xs fill-muted-foreground"
          />
          <Radar
            name={title}
            dataKey={dataKey}
            stroke={color}
            fill={color}
            fillOpacity={0.2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </BaseChart>
  )
}