"use client"

import { Line } from "recharts"

interface LineSeriesProps {
  dataKey: string
  stroke: string
  strokeWidth?: number
  dot?: boolean | object
  activeDot?: boolean | object
  style?: React.CSSProperties
}

export function LineSeries({
  dataKey,
  stroke,
  strokeWidth = 2,
  dot = false,
  activeDot = { r: 4, strokeWidth: 2 },
  style,
}: LineSeriesProps) {
  return (
    <Line
      type="monotone"
      dataKey={dataKey}
      stroke={stroke}
      strokeWidth={strokeWidth}
      dot={dot}
      activeDot={activeDot}
      style={{ strokeWidth, ...style }}
    />
  )
}