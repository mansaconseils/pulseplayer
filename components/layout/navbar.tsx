"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Users, TrendingUp, Newspaper, Users2, Timer, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationBell } from "@/components/notifications/notification-bell"
import { navigation } from "@/lib/config/navigation"

const icons = {
  Activity,
  Users,
  TrendingUp,
  Newspaper,
  Users2,
  Timer,
  MessageCircle,
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Activity className="h-6 w-6" />
              <span className="text-xl font-bold">PlayerPulse</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:items-center md:space-x-4">
              {navigation.map((item) => {
                const Icon = icons[item.icon as keyof typeof icons]
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationBell />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}