"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FileDown } from "lucide-react"
import { useReportStore } from "@/lib/reports/store"
import { generateReport, exportReport } from "@/lib/reports/generator"
import type { ReportFormat } from "@/lib/reports/types"

interface ReportGeneratorProps {
  playerId: string
}

const sections = [
  { id: "performance", label: "Performance Metrics" },
  { id: "social", label: "Social Media Analytics" },
  { id: "media", label: "Media Coverage" },
  { id: "comparison", label: "Peer Comparison" },
  { id: "trends", label: "Historical Trends" },
]

const formats: { value: ReportFormat; label: string }[] = [
  { value: "pdf", label: "PDF Document" },
  { value: "excel", label: "Excel Spreadsheet" },
  { value: "csv", label: "CSV File" },
  { value: "json", label: "JSON Data" },
]

export function ReportGenerator({ playerId }: ReportGeneratorProps) {
  const [selectedSections, setSelectedSections] = useState<string[]>([])
  const [format, setFormat] = useState<ReportFormat>("pdf")
  const [isGenerating, setIsGenerating] = useState(false)
  const { templates, addTemplate } = useReportStore()

  const handleGenerate = async () => {
    if (selectedSections.length === 0) return

    setIsGenerating(true)
    try {
      const template = {
        name: "Custom Report",
        description: "Generated report",
        sections: selectedSections,
        charts: [],
        metrics: [],
        format,
      }

      const data = await generateReport(template, playerId)
      await exportReport(data, format, `player-report-${playerId}`)
    } catch (error) {
      console.error("Failed to generate report:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveTemplate = () => {
    if (selectedSections.length === 0) return

    addTemplate({
      name: "Custom Template",
      description: "Custom report template",
      sections: selectedSections,
      charts: [],
      metrics: [],
      format,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileDown className="h-4 w-4" />
          Generate Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Performance Report</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Report Sections</Label>
            <div className="space-y-2">
              {sections.map((section) => (
                <div key={section.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={section.id}
                    checked={selectedSections.includes(section.id)}
                    onCheckedChange={(checked) => {
                      setSelectedSections(
                        checked
                          ? [...selectedSections, section.id]
                          : selectedSections.filter((id) => id !== section.id)
                      )
                    }}
                  />
                  <Label htmlFor={section.id}>{section.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Export Format</Label>
            <Select value={format} onValueChange={(value) => setFormat(value as ReportFormat)}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    {format.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleSaveTemplate}
              disabled={selectedSections.length === 0}
            >
              Save as Template
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={selectedSections.length === 0 || isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate Report"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}