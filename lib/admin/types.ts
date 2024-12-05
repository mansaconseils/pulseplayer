```typescript
import { z } from "zod"

export const userRoleSchema = z.enum([
  "admin",
  "manager",
  "analyst",
  "viewer",
])

export const permissionSchema = z.enum([
  "manage_users",
  "manage_settings",
  "view_audit_logs",
  "manage_data",
  "export_data",
  "manage_teams",
  "manage_players",
])

export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  role: userRoleSchema,
  permissions: z.array(permissionSchema),
  active: z.boolean(),
  lastLogin: z.date().optional(),
  createdAt: z.date(),
})

export const auditLogSchema = z.object({
  id: z.string(),
  userId: z.string(),
  action: z.string(),
  resource: z.string(),
  details: z.record(z.string(), z.any()),
  timestamp: z.date(),
  ip: z.string(),
})

export const systemSettingsSchema = z.object({
  maintenance: z.boolean(),
  dataRetentionDays: z.number(),
  backupFrequency: z.enum(["daily", "weekly", "monthly"]),
  alertThresholds: z.record(z.string(), z.number()),
  features: z.record(z.string(), z.boolean()),
})

export const systemMetricsSchema = z.object({
  cpu: z.number(),
  memory: z.number(),
  storage: z.number(),
  activeUsers: z.number(),
  requestsPerMinute: z.number(),
  errorRate: z.number(),
  lastUpdated: z.date(),
})

export type UserRole = z.infer<typeof userRoleSchema>
export type Permission = z.infer<typeof permissionSchema>
export type User = z.infer<typeof userSchema>
export type AuditLog = z.infer<typeof auditLogSchema>
export type SystemSettings = z.infer<typeof systemSettingsSchema>
export type SystemMetrics = z.infer<typeof systemMetricsSchema>
```