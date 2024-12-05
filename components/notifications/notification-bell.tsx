"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useNotificationStore } from "@/lib/notifications/store"
import { NotificationList } from "./notification-list"
import { NotificationPreferences } from "./notification-preferences"

export function NotificationBell() {
  const unreadCount = useNotificationStore((state) => state.unreadCount)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
        </SheetHeader>
        <div className="mt-8 space-y-8">
          <NotificationList />
          <NotificationPreferences />
        </div>
      </SheetContent>
    </Sheet>
  )
}