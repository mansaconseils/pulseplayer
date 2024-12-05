import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Notification, NotificationPreferences } from "./types"

interface NotificationStore {
  notifications: Notification[]
  preferences: NotificationPreferences
  unreadCount: number
  
  // Actions
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
  updatePreferences: (preferences: Partial<NotificationPreferences>) => void
}

const defaultPreferences: NotificationPreferences = {
  email: true,
  push: true,
  inApp: true,
  types: {
    performance: true,
    social: true,
    media: true,
    system: true,
  },
  priorities: {
    low: true,
    medium: true,
    high: true,
  },
}

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      notifications: [],
      preferences: defaultPreferences,
      unreadCount: 0,

      addNotification: (notification) => set((state) => {
        const newNotification = {
          id: crypto.randomUUID(),
          timestamp: new Date(),
          read: false,
          ...notification,
        }
        return {
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1,
        }
      }),

      markAsRead: (id) => set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: state.unreadCount - 1,
      })),

      markAllAsRead: () => set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
      })),

      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: state.unreadCount - (state.notifications.find((n) => n.id === id)?.read ? 0 : 1),
      })),

      clearAll: () => set({ notifications: [], unreadCount: 0 }),

      updatePreferences: (preferences) => set((state) => ({
        preferences: { ...state.preferences, ...preferences },
      })),
    }),
    {
      name: "notifications",
    }
  )
)