"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useNotificationStore } from "@/lib/notifications/store"

export function NotificationPreferences() {
  const { preferences, updatePreferences } = useNotificationStore()

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="preferences">
        <AccordionTrigger>Notification Preferences</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="font-medium">Delivery Methods</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <Switch
                    id="email-notifications"
                    checked={preferences.email}
                    onCheckedChange={(checked) =>
                      updatePreferences({ email: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <Switch
                    id="push-notifications"
                    checked={preferences.push}
                    onCheckedChange={(checked) =>
                      updatePreferences({ push: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                  <Switch
                    id="in-app-notifications"
                    checked={preferences.inApp}
                    onCheckedChange={(checked) =>
                      updatePreferences({ inApp: checked })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Notification Types</h4>
              <div className="space-y-2">
                {Object.entries(preferences.types).map(([type, enabled]) => (
                  <div key={type} className="flex items-center justify-between">
                    <Label htmlFor={`type-${type}`}>
                      {type.charAt(0).toUpperCase() + type.slice(1)} Updates
                    </Label>
                    <Switch
                      id={`type-${type}`}
                      checked={enabled}
                      onCheckedChange={(checked) =>
                        updatePreferences({
                          types: { ...preferences.types, [type]: checked },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Priority Levels</h4>
              <div className="space-y-2">
                {Object.entries(preferences.priorities).map(([priority, enabled]) => (
                  <div key={priority} className="flex items-center justify-between">
                    <Label htmlFor={`priority-${priority}`}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                    </Label>
                    <Switch
                      id={`priority-${priority}`}
                      checked={enabled}
                      onCheckedChange={(checked) =>
                        updatePreferences({
                          priorities: { ...preferences.priorities, [priority]: checked },
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}