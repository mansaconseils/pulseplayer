"use client"

import { cn } from "@/lib/utils"

interface ResponsiveStackProps {
  children: React.ReactNode
  className?: string
  direction?: {
    default: "row" | "col"
    sm?: "row" | "col"
    md?: "row" | "col"
    lg?: "row" | "col"
  }
  gap?: number
}

export function ResponsiveStack({
  children,
  className,
  direction = { default: "col" },
  gap = 4,
}: ResponsiveStackProps) {
  const flexDirection = {
    default: direction.default === "row" ? "flex-row" : "flex-col",
    sm: direction.sm ? `sm:flex-${direction.sm}` : "",
    md: direction.md ? `md:flex-${direction.md}` : "",
    lg: direction.lg ? `lg:flex-${direction.lg}` : "",
  }

  return (
    <div
      className={cn(
        "flex",
        `gap-${gap}`,
        flexDirection.default,
        flexDirection.sm,
        flexDirection.md,
        flexDirection.lg,
        className
      )}
    >
      {children}
    </div>
  )
}