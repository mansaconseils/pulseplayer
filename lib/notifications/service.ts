import { toast } from "sonner"
import type { Notification, NotificationPreferences } from "./types"
import { useNotificationStore } from "./store"

export async function sendNotification(
  notification: Omit<Notification, "id" | "timestamp" | "read">
) {
  const preferences = useNotificationStore.getState().preferences

  // Check if user wants to receive this type of notification
  if (!shouldSendNotification(notification, preferences)) {
    return
  }

  // Add to in-app notifications
  if (preferences.inApp) {
    useNotificationStore.getState().addNotification(notification)
  }

  // Show toast notification
  toast(notification.title, {
    description: notification.message,
  })

  // Send push notification if enabled and supported
  if (preferences.push && "Notification" in window) {
    try {
      const permission = await Notification.requestPermission()
      if (permission === "granted") {
        new Notification(notification.title, {
          body: notification.message,
          icon: "/icon.png",
        })
      }
    } catch (error) {
      console.error("Failed to send push notification:", error)
    }
  }

  // Send email notification if enabled
  if (preferences.email) {
    await sendEmailNotification(notification)
  }
}

function shouldSendNotification(
  notification: Omit<Notification, "id" | "timestamp" | "read">,
  preferences: NotificationPreferences
): boolean {
  return (
    preferences.types[notification.type] &&
    preferences.priorities[notification.priority]
  )
}

async function sendEmailNotification(
  notification: Omit<Notification, "id" | "timestamp" | "read">
) {
  // Implement email sending logic here
  // This would typically involve calling your backend API
  console.log("Sending email notification:", notification)
}

export function subscribeToNotifications() {
  // Subscribe to various notification sources
  // This could include WebSocket connections, SSE, or polling
  console.log("Subscribing to notifications")
}