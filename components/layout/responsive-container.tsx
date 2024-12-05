"use client"

import { cn } from "@/lib/utils"
import { useTouchGestures } from "@/lib/hooks/use-touch-gestures"
import { useOffline } from "@/lib/hooks/use-offline"
import { OfflineBanner } from "@/components/offline-banner"

interface ResponsiveContainerProps {
  children: React.ReactNode
  className?: string
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

export function ResponsiveContainer({
  children,
  className,
  onSwipeLeft,
  onSwipeRight,
}: ResponsiveContainerProps) {
  const isOffline = useOffline()

  useTouchGestures({
    onSwipeLeft,
    onSwipeRight,
    threshold: 50,
  })

  return (
    <div className={cn("relative min-h-screen w-full", className)}>
      {children}
      {isOffline && <OfflineBanner />}
    </div>
  )
}