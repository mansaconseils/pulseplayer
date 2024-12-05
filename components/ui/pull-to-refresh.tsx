"use client"

import { useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { ArrowDown } from "lucide-react"

interface PullToRefreshProps {
  children: React.ReactNode
  onRefresh: () => Promise<void>
}

export function PullToRefresh({ children, onRefresh }: PullToRefreshProps) {
  const [refreshing, setRefreshing] = useState(false)
  const controls = useAnimation()
  let startY = 0

  const handleTouchStart = (e: React.TouchEvent) => {
    startY = e.touches[0].clientY
  }

  const handleTouchMove = async (e: React.TouchEvent) => {
    const deltaY = e.touches[0].clientY - startY
    if (deltaY > 0 && window.scrollY === 0 && !refreshing) {
      const pullDistance = Math.min(deltaY, 100)
      await controls.start({ height: pullDistance })
    }
  }

  const handleTouchEnd = async () => {
    const height = (await controls.get())?.height || 0
    if (height > 50 && !refreshing) {
      setRefreshing(true)
      await onRefresh()
      setRefreshing(false)
    }
    controls.start({ height: 0 })
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        animate={controls}
        initial={{ height: 0 }}
        className="flex items-center justify-center overflow-hidden bg-muted"
      >
        {refreshing ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <ArrowDown className="h-6 w-6" />
          </motion.div>
        ) : (
          <ArrowDown className="h-6 w-6" />
        )}
      </motion.div>
      {children}
    </div>
  )
}