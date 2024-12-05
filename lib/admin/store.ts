```typescript
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { User, AuditLog, SystemSettings, SystemMetrics } from "./types"

interface AdminStore {
  users: User[]
  auditLogs: AuditLog[]
  settings: SystemSettings
  metrics: SystemMetrics | null
  
  // User Management
  addUser: (user: Omit<User, "id" | "createdAt">) => void
  updateUser: (id: string, updates: Partial<User>) => void
  deleteUser: (id: string) => void
  
  // Audit Logs
  addAuditLog: (log: Omit<AuditLog, "id" | "timestamp">) => void
  clearAuditLogs: () => void
  
  // Settings
  updateSettings: (updates: Partial<SystemSettings>) => void
  
  // Metrics
  updateMetrics: (metrics: SystemMetrics) => void
}

const defaultSettings: SystemSettings = {
  maintenance: false,
  dataRetentionDays: 90,
  backupFrequency: "daily",
  alertThresholds: {
    cpu: 80,
    memory: 80,
    storage: 90,
    errorRate: 5,
  },
  features: {
    socialAnalytics: true,
    mediaTracking: true,
    performancePredictions: true,
    automatedReports: true,
  },
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      users: [],
      auditLogs: [],
      settings: defaultSettings,
      metrics: null,

      addUser: (user) => set((state) => ({
        users: [
          ...state.users,
          {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            ...user,
          },
        ],
      })),

      updateUser: (id, updates) => set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, ...updates } : user
        ),
      })),

      deleteUser: (id) => set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      })),

      addAuditLog: (log) => set((state) => ({
        auditLogs: [
          {
            id: crypto.randomUUID(),
            timestamp: new Date(),
            ...log,
          },
          ...state.auditLogs,
        ],
      })),

      clearAuditLogs: () => set({ auditLogs: [] }),

      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates },
      })),

      updateMetrics: (metrics) => set({ metrics }),
    }),
    {
      name: "admin-store",
    }
  )
)
```