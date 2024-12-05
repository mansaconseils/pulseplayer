"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TouchRippleProps {
  children: React.ReactNode
  color?: string
  duration?: number
}

export function TouchRipple({
  children,
  color = "rgba(255, 255, 255, 0.3)",
  duration = 0.5,
}: TouchRippleProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = []
    ripples.forEach((ripple) => {
      const timeout = setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
      }, duration * 1000)
      timeouts.push(timeout)
    })
    return () => timeouts.forEach((timeout) => clearTimeout(timeout))
  }, [ripples, duration])

  const handleTouchStart = (e: React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const y = e.touches[0].clientY - rect.top
    setRipples((prev) => [...prev, { x, y, id: Date.now() }])
  }

  return (
    <div className="relative overflow-hidden" onTouchStart={handleTouchStart}>
      {children}
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            style={{
              position: "absolute",
              left: ripple.x,
              top: ripple.y,
              width: 100,
              height: 100,
              borderRadius: "50%",
              backgroundColor: color,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}