"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { FileUp, FileDown } from "lucide-react"
import { importData, exportData } from "@/lib/data/import-export"
import type { DataSource } from "@/lib/data/types"
import { toast } from "sonner"

export function ImportExportManager() {
  const [source, setSource] = useState<DataSource>("performance")
  const [format, setFormat] = useState<"json" | "csv">("json")
  const [validateImport, setValidateImport] = useState(true)
  const [includeMetadata, setIncludeMetadata] = useState(true)

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const fileContent = await file.text()
      await importData({
        source,
        format,
        validateData: validateImport,
        overwrite: false,
      }, fileContent)
      toast.success("Data imported successfully")
    } catch (error) {
      toast.error("Failed to import data")
    }
  }

  const handleExport = async () => {
    try {
      // In a real app, you would fetch the actual data to export
      const mockData = { /* ... */ }
      const exportedData = await exportData({
        source,
        format,
        includeMetadata,
      }, mockData)

      // Create and download file
      const blob = new Blob([exportedData], {
        type: format === "json" ? "application/json" : "text/csv",
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `${source}-export.${format}`
      link.click()
      URL.revokeObjectURL(url)

      toast.success("Data exported successfully")
    } catch (error) {
      toast.error("Failed to export data")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import & Export</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Data Source</Label>
            <Select value={source} onValueChange={(value) => setSource(value as DataSource)}>
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">Performance Data</SelectItem>
                <SelectItem value="social">Social Media Data</SelectItem>
                <SelectItem value="media">Media Coverage Data</SelectItem>
                <SelectItem value="matches">Match Data</SelectItem>
                <SelectItem value="teams">Team Data</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>File Format</Label>
            <Select value={format} onValueChange={(value) => setFormat(value as "json" | "csv")}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label>Validate Import Data</Label>
            <Switch
              checked={validateImport}
              onCheckedChange={setValidateImport}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Include Export Metadata</Label>
            <Switch
              checked={includeMetadata}
              onCheckedChange={setIncludeMetadata}
            />
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline" className="gap-2" asChild>
            <label>
              <FileUp className="h-4 w-4" />
              Import Data
              <input
                type="file"
                accept={format === "json" ? ".json" : ".csv"}
                className="hidden"
                onChange={handleImport}
              />
            </label>
          </Button>
          <Button onClick={handleExport} className="gap-2">
            <FileDown className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}