import { z } from "zod"

export const notificationTypeSchema = z.enum([
  "performance",
  "social",
  "media",
  "system",
])

export const notificationPrioritySchema = z.enum([
  "low",
  "medium",
  "high",
])

export const notificationSchema = z.object({
  id: z.string(),
  type: notificationTypeSchema,
  title: z.string(),
  message: z.string(),
  priority: notificationPrioritySchema,
  timestamp: z.date(),
  read: z.boolean(),
  actionUrl: z.string().optional(),
  playerId: z.string().optional(),
})

export type NotificationType = z.infer<typeof notificationTypeSchema>
export type NotificationPriority = z.infer<typeof notificationPrioritySchema>
export type Notification = z.infer<typeof notificationSchema>

export const notificationPreferencesSchema = z.object({
  email: z.boolean(),
  push: z.boolean(),
  inApp: z.boolean(),
  types: z.record(z.enum(["performance", "social", "media", "system"]), z.boolean()),
  priorities: z.record(z.enum(["low", "medium", "high"]), z.boolean()),
})

export type NotificationPreferences = z.infer<typeof notificationPreferencesSchema>