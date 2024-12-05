```typescript
"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"
import { useAdminStore } from "@/lib/admin/store"

export function AuditLogs() {
  const { auditLogs, clearAuditLogs } = useAdminStore()
  const [filter, setFilter] = useState<string>("all")

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "default"
      case "update":
        return "secondary"
      case "delete":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Audit Logs</CardTitle>
            <CardDescription>
              System activity and changes
            </CardDescription>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              if (confirm("Are you sure you want to clear all audit logs?")) {
                clearAuditLogs()
              }
            }}
          >
            Clear Logs
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={getActionColor(log.action)}>
                      {log.action}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {format(log.timestamp, "PPpp")}
                    </span>
                  </div>
                  <p className="font-medium">
                    {log.resource}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    User: {log.userId}
                  </p>
                  {Object.entries(log.details).map(([key, value]) => (
                    <p key={key} className="text-sm">
                      <span className="font-medium">{key}:</span>{" "}
                      {JSON.stringify(value)}
                    </p>
                  ))}
                </div>
                <Badge variant="outline">{log.ip}</Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
```