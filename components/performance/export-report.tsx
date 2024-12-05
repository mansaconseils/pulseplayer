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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FileDown } from "lucide-react"

const reportSections = [
  { id: "overview", label: "Performance Overview" },
  { id: "advanced", label: "Advanced Metrics" },
  { id: "predictions", label: "Performance Predictions" },
  { id: "comparison", label: "Peer Comparison" },
  { id: "recommendations", label: "Improvement Recommendations" },
]

export function ExportReport() {
  const [selectedSections, setSelectedSections] = useState<string[]>([])

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting sections:", selectedSections)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileDown className="h-4 w-4" />
          Export Report
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Performance Report</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-4">
            {reportSections.map((section) => (
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
          <div className="flex justify-end">
            <Button onClick={handleExport} disabled={selectedSections.length === 0}>
              Generate Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}