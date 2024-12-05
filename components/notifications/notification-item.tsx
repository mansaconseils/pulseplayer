"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"
import { Activity, MessageCircle, Newspaper, Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNotificationStore } from "@/lib/notifications/store"
import type { Notification } from "@/lib/notifications/types"

interface NotificationItemProps {
  notification: Notification
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { markAsRead, removeNotification } = useNotificationStore()

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id)
    }
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl
    }
  }

  const getIcon = () => {
    switch (notification.type) {
      case "performance":
        return Activity
      case "social":
        return MessageCircle
      case "media":
        return Newspaper
      default:
        return Bell
    }
  }

  const Icon = getIcon()

  return (
    <div
      className={`relative rounded-lg border p-4 transition-colors ${
        notification.read ? "bg-background" : "bg-muted/50"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <Icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <p className="font-medium leading-none">{notification.title}</p>
            <Badge
              variant={
                notification.priority === "high"
                  ? "destructive"
                  : notification.priority === "medium"
                  ? "default"
                  : "secondary"
              }
            >
              {notification.priority}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{notification.message}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
          </p>
        </div>
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute right-2 top-2"
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => removeNotification(notification.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}