"use client"

import {
  LineChart as RechartsLineChart,
  Line,
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
  strokeWidth?: number
}

interface LineChartProps {
  title: string
  description?: string
  data: any[]
  series: Series[]
  xAxisKey: string
  className?: string
  height?: number
  allowExport?: boolean
}

export function LineChart({
  title,
  description,
  data,
  series,
  xAxisKey,
  className,
  height,
  allowExport,
}: LineChartProps) {
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
        <RechartsLineChart data={data}>
          <CustomXAxis dataKey={xAxisKey} />
          <CustomYAxis />
          <Tooltip content={<ChartTooltip />} />
          <Legend />
          {series.map(({ key, name, color, strokeWidth = 2 }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              name={name}
              stroke={color}
              strokeWidth={strokeWidth}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </BaseChart>
  )
}