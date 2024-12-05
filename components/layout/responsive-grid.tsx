"use client"

import { cn } from "@/lib/utils"

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: number
}

export function ResponsiveGrid({
  children,
  className,
  cols = { default: 1 },
  gap = 4,
}: ResponsiveGridProps) {
  const gridCols = {
    default: `grid-cols-${cols.default}`,
    sm: cols.sm ? `sm:grid-cols-${cols.sm}` : "",
    md: cols.md ? `md:grid-cols-${cols.md}` : "",
    lg: cols.lg ? `lg:grid-cols-${cols.lg}` : "",
    xl: cols.xl ? `xl:grid-cols-${cols.xl}` : "",
  }

  return (
    <div
      className={cn(
        "grid",
        `gap-${gap}`,
        gridCols.default,
        gridCols.sm,
        gridCols.md,
        gridCols.lg,
        gridCols.xl,
        className
      )}
    >
      {children}
    </div>
  )
}