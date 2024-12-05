```typescript
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAdminStore } from "@/lib/admin/store"

export function SystemSettings() {
  const { settings, updateSettings } = useAdminStore()

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>
            Configure system-wide settings and features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Disable access to the system for maintenance
              </p>
            </div>
            <Switch
              checked={settings.maintenance}
              onCheckedChange={(checked) =>
                updateSettings({ maintenance: checked })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Data Retention (Days)</Label>
            <Input
              type="number"
              value={settings.dataRetentionDays}
              onChange={(e) =>
                updateSettings({
                  dataRetentionDays: parseInt(e.target.value),
                })
              }
              min={1}
              max={365}
            />
          </div>

          <div className="space-y-2">
            <Label>Backup Frequency</Label>
            <Select
              value={settings.backupFrequency}
              onValueChange={(value) =>
                updateSettings({
                  backupFrequency: value as "daily" | "weekly" | "monthly",
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Alert Thresholds</Label>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(settings.alertThresholds).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label className="capitalize">
                    {key.replace(/_/g, " ")}
                  </Label>
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) =>
                      updateSettings({
                        alertThresholds: {
                          ...settings.alertThresholds,
                          [key]: parseFloat(e.target.value),
                        },
                      })
                    }
                    min={0}
                    max={100}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Feature Toggles</Label>
            <div className="space-y-4">
              {Object.entries(settings.features).map(([key, enabled]) => (
                <div
                  key={key}
                  className="flex items-center justify-between"
                >
                  <Label className="capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                  <Switch
                    checked={enabled}
                    onCheckedChange={(checked) =>
                      updateSettings({
                        features: {
                          ...settings.features,
                          [key]: checked,
                        },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
```