"use client"

import { WifiOff } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useOffline } from "@/lib/hooks/use-offline"

export function OfflineBanner() {
  const isOffline = useOffline()

  if (!isOffline) return null

  return (
    <Alert variant="destructive" className="fixed bottom-4 left-4 right-4 z-50">
      <WifiOff className="h-4 w-4" />
      <AlertDescription>
        You are currently offline. Some features may be limited.
      </AlertDescription>
    </Alert>
  )
}