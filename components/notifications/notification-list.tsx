"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNotificationStore } from "@/lib/notifications/store"
import { NotificationItem } from "./notification-item"

export function NotificationList() {
  const { notifications, markAllAsRead, clearAll } = useNotificationStore()

  useEffect(() => {
    // Request permission for push notifications
    if ("Notification" in window) {
      Notification.requestPermission()
    }
  }, [])

  if (notifications.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-center text-sm text-muted-foreground">
        No notifications
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Recent Notifications</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
          >
            Clear all
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[400px]">
        <AnimatePresence mode="popLayout">
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
            >
              <NotificationItem notification={notification} />
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>
    </div>
  )
}