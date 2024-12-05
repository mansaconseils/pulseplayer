"use client"

import { XAxis, YAxis } from "recharts"

interface AxisProps {
  dataKey?: string
  tickFormatter?: (value: any) => string
  domain?: [number | string, number | string]
  ticks?: number[]
  fontSize?: number
  stroke?: string
  tickLine?: boolean
  axisLine?: boolean
  style?: React.CSSProperties
}

export function CustomXAxis({
  dataKey,
  tickFormatter,
  domain,
  ticks,
  fontSize = 12,
  stroke = "hsl(var(--muted-foreground))",
  tickLine = false,
  axisLine = false,
  style,
}: AxisProps) {
  return (
    <XAxis
      dataKey={dataKey}
      stroke={stroke}
      fontSize={fontSize}
      tickLine={tickLine}
      axisLine={axisLine}
      tickFormatter={tickFormatter}
      domain={domain}
      ticks={ticks}
      style={{ fontSize, ...style }}
    />
  )
}

export function CustomYAxis({
  tickFormatter,
  domain,
  ticks,
  fontSize = 12,
  stroke = "hsl(var(--muted-foreground))",
  tickLine = false,
  axisLine = false,
  style,
}: Omit<AxisProps, "dataKey">) {
  return (
    <YAxis
      stroke={stroke}
      fontSize={fontSize}
      tickLine={tickLine}
      axisLine={axisLine}
      tickFormatter={tickFormatter}
      domain={domain}
      ticks={ticks}
      style={{ fontSize, ...style }}
    />
  )
}