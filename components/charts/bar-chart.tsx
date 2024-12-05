"use client"

import {
  BarChart as RechartsBarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { BaseChart } from "./base-chart"
import { CustomXAxis, CustomYAxis } from "./custom-axis"
import { ChartTooltip } from "./chart-tooltip"

interface Series {
  key: string
  name: string
  color: string
}

interface BarChartProps {
  title: string
  description?: string
  data: any[]
  series: Series[]
  xAxisKey: string
  className?: string
  height?: number
  allowExport?: boolean
}

export function BarChart({
  title,
  description,
  data,
  series,
  xAxisKey,
  className,
  height,
  allowExport,
}: BarChartProps) {
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
        <RechartsBarChart data={data}>
          <CustomXAxis dataKey={xAxisKey} />
          <CustomYAxis />
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          {series.map(({ key, name, color }) => (
            <Bar
              key={key}
              dataKey={key}
              name={name}
              fill={color}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </BaseChart>
  )
}