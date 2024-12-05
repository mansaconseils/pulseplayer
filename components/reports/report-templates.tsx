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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash2, FileDown, Clock } from "lucide-react"
import { useReportStore } from "@/lib/reports/store"
import { generateReport, exportReport } from "@/lib/reports/generator"

interface ReportTemplatesProps {
  playerId: string
}

export function ReportTemplates({ playerId }: ReportTemplatesProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { templates, deleteTemplate, scheduleReport, unscheduleReport } = useReportStore()

  const handleGenerate = async (template: any) => {
    setIsGenerating(true)
    try {
      const data = await generateReport(template, playerId)
      await exportReport(data, template.format, `player-report-${playerId}`)
    } catch (error) {
      console.error("Failed to generate report:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (templates.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        No saved templates
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Clock className="h-4 w-4" />
          Saved Templates
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report Templates</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-1">
                  <p className="font-medium">{template.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleGenerate(template)}
                    disabled={isGenerating}
                  >
                    <FileDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => deleteTemplate(template.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}