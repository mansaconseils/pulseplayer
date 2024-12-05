"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { ChartContainer } from "./chart-container"
import { exportChartAsImage, exportChartData } from "@/lib/charts/export"

interface BaseChartProps {
  title: string
  description?: string
  data: any[]
  children: React.ReactNode
  className?: string
  height?: number
  allowExport?: boolean
}

export function BaseChart({
  title,
  description,
  data,
  children,
  className,
  height = 350,
  allowExport = true,
}: BaseChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)

  const handleExport = async () => {
    if (!chartRef.current) return

    try {
      await Promise.all([
        exportChartAsImage(chartRef.current, title.toLowerCase().replace(/\s+/g, "-")),
        exportChartData(data, title.toLowerCase().replace(/\s+/g, "-")),
      ])
    } catch (error) {
      console.error("Failed to export chart:", error)
    }
  }

  return (
    <ChartContainer
      title={title}
      description={description}
      onExport={allowExport ? handleExport : undefined}
      className={className}
    >
      <motion.div
        ref={chartRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ height }}
      >
        {children}
      </motion.div>
    </ChartContainer>
  )
}