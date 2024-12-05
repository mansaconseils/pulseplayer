"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface BottomSheetProps {
  children: React.ReactNode
  title?: string
  isOpen: boolean
  onClose: () => void
}

export function BottomSheet({
  children,
  title,
  isOpen,
  onClose,
}: BottomSheetProps) {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(_, info) => {
              setIsDragging(false)
              if (info.offset.y > 100) {
                onClose()
              }
            }}
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-xl bg-background p-4"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="mx-auto h-1 w-12 rounded-full bg-muted" />
            </div>
            {title && (
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{title}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full"
                >
                  <ChevronDown className="h-6 w-6" />
                </Button>
              </div>
            )}
            <div className={isDragging ? "pointer-events-none" : ""}>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}