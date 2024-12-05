"use client"

import { useEffect, useRef, useState } from "react"

interface TouchGestureOptions {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  threshold?: number
}

export function useTouchGestures({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
}: TouchGestureOptions) {
  const touchStart = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    function handleTouchStart(e: TouchEvent) {
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }
    }

    function handleTouchEnd(e: TouchEvent) {
      if (!touchStart.current) return

      const deltaX = e.changedTouches[0].clientX - touchStart.current.x
      const deltaY = e.changedTouches[0].clientY - touchStart.current.y

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (Math.abs(deltaX) > threshold) {
          if (deltaX > 0) {
            onSwipeRight?.()
          } else {
            onSwipeLeft?.()
          }
        }
      } else {
        if (Math.abs(deltaY) > threshold) {
          if (deltaY > 0) {
            onSwipeDown?.()
          } else {
            onSwipeUp?.()
          }
        }
      }

      touchStart.current = null
    }

    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchend", handleTouchEnd)

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, threshold])
}