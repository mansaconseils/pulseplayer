"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Clock, Calendar, Trash2 } from "lucide-react"
import { useReportStore } from "@/lib/reports/store"

interface ScheduledReportsProps {
  playerId: string
}

export function ScheduledReports({ playerId }: ScheduledReportsProps) {
  const { scheduledReports, unscheduleReport } = useReportStore()

  const getScheduleText = (schedule: any) => {
    if (!schedule) return "Not scheduled"
    
    switch (schedule.frequency) {
      case "daily":
        return `Daily at ${schedule.time}`
      case "weekly":
        return `Weekly on ${getDayName(schedule.dayOfWeek)} at ${schedule.time}`
      case "monthly":
        return `Monthly on day ${schedule.dayOfMonth} at ${schedule.time}`
      default:
        return "Custom schedule"
    }
  }

  const getDayName = (day: number) => {
    return new Date(0, 0, day).toLocaleString("default", { weekday: "long" })
  }

  if (scheduledReports.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        No scheduled reports
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Scheduled Reports
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Scheduled Reports</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {scheduledReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="font-medium">{report.name}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{getScheduleText(report.schedule)}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => unscheduleReport(report.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}