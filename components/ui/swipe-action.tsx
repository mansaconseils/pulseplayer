"use client"

import { useState } from "react"
import { motion, PanInfo, useAnimation } from "framer-motion"

interface SwipeActionProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  threshold?: number
}

export function SwipeAction({
  children,
  onSwipeLeft,
  onSwipeRight,
  threshold = 0.4,
}: SwipeActionProps) {
  const [isDragging, setIsDragging] = useState(false)
  const controls = useAnimation()

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const width = window.innerWidth
    const threshold_px = width * threshold

    if (info.offset.x < -threshold_px && onSwipeLeft) {
      onSwipeLeft()
    } else if (info.offset.x > threshold_px && onSwipeRight) {
      onSwipeRight()
    }

    controls.start({ x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } })
    setIsDragging(false)
  }

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      animate={controls}
      className={isDragging ? "cursor-grabbing" : "cursor-grab"}
    >
      {children}
    </motion.div>
  )
}