"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ChartContainerProps {
  title: string
  description?: string
  children: React.ReactNode
  onExport?: () => void
  className?: string
}

export function ChartContainer({
  title,
  description,
  children,
  onExport,
  className,
}: ChartContainerProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <AnimatePresence>
          {isHovered && onExport && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <Button
                variant="outline"
                size="icon"
                onClick={onExport}
                className="h-8 w-8"
              >
                <Download className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}