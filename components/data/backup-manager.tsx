"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Database, Trash2, RotateCcw } from "lucide-react"
import { useDataStore } from "@/lib/data/store"
import { createBackup, restoreBackup, deleteBackup } from "@/lib/data/backup"
import { formatBytes } from "@/lib/data/utils"
import { toast } from "sonner"

export function BackupManager() {
  const [isLoading, setIsLoading] = useState(false)
  const { backups, lastBackupTime } = useDataStore()

  const handleCreateBackup = async () => {
    setIsLoading(true)
    try {
      // In a real app, you would fetch the actual data to backup
      const mockData = { /* ... */ }
      await createBackup("performance", mockData)
      toast.success("Backup created successfully")
    } catch (error) {
      toast.error("Failed to create backup")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestoreBackup = async (backupId: string) => {
    try {
      await restoreBackup(backupId)
      toast.success("Backup restored successfully")
    } catch (error) {
      toast.error("Failed to restore backup")
    }
  }

  const handleDeleteBackup = async (backupId: string) => {
    try {
      await deleteBackup(backupId)
      toast.success("Backup deleted successfully")
    } catch (error) {
      toast.error("Failed to delete backup")
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Data Backups</CardTitle>
        <Button
          onClick={handleCreateBackup}
          disabled={isLoading}
        >
          <Database className="mr-2 h-4 w-4" />
          Create Backup
        </Button>
      </CardHeader>
      <CardContent>
        {lastBackupTime && (
          <p className="mb-4 text-sm text-muted-foreground">
            Last backup: {format(lastBackupTime, "PPpp")}
          </p>
        )}
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {backups.map((backup) => (
              <div
                key={backup.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">
                      {format(backup.timestamp, "PPp")}
                    </p>
                    <Badge>{backup.source}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Size: {formatBytes(backup.size)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRestoreBackup(backup.id)}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteBackup(backup.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}