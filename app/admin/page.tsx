```typescript
"use client"

import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "@/components/admin/user-management"
import { SystemSettings } from "@/components/admin/system-settings"
import { AuditLogs } from "@/components/admin/audit-logs"
import { SystemHealth } from "@/components/admin/system-health"
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton"

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Administration</h1>
        <p className="text-muted-foreground">
          Manage users, settings, and monitor system health
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            <TabsTrigger value="health">System Health</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>

          <TabsContent value="audit">
            <AuditLogs />
          </TabsContent>

          <TabsContent value="health">
            <SystemHealth />
          </TabsContent>
        </Tabs>
      </Suspense>
    </div>
  )
}
```