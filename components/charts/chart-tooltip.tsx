"use client"

import { motion } from "framer-motion"
import { TooltipProps } from "recharts"

interface CustomTooltipProps extends TooltipProps<number, string> {
  title?: string
}

export function ChartTooltip({
  active,
  payload,
  label,
  title,
}: CustomTooltipProps) {
  if (!active || !payload) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border bg-background p-3 shadow-lg"
    >
      {title && <p className="mb-1 text-sm font-medium">{title}</p>}
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