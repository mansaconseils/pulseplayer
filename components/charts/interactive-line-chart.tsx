"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  Legend,
  TooltipProps,
} from "recharts"
import { CustomXAxis, CustomYAxis } from "./custom-axis"
import { motion } from "framer-motion"

interface DataPoint {
  [key: string]: number | string
}

interface Series {
  key: string
  color: string
  name: string
}

interface InteractiveLineChartProps {
  data: DataPoint[]
  series: Series[]
  xAxisKey: string
  height?: number
}

export function InteractiveLineChart({
  data,
  series,
  xAxisKey,
  height = 300,
}: InteractiveLineChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (!active || !payload) return null

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border bg-background p-3 shadow-lg"
      >
        <p className="mb-2 font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p
            key={index}
            className="flex items-center gap-2 text-sm"
            style={{ color: entry.color }}
          >
            <span className="font-medium">{entry.name}:</span>
            <span>{entry.value}</span>
          </p>
        ))}
      </motion.div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart
        data={data}
        onMouseMove={(e) => {
          if (e.activeTooltipIndex !== undefined) {
            setActiveIndex(e.activeTooltipIndex)
          }
        }}
        onMouseLeave={() => setActiveIndex(null)}
      >
        <CustomXAxis dataKey={xAxisKey} />
        <CustomYAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            stroke={s.color}
            name={s.name}
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 6,
              strokeWidth: 2,
              stroke: "white",
            }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}