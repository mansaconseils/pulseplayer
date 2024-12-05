import { ImportConfig, ExportConfig, DataSource } from "./types"
import { validateData } from "./validation"
import { parseCSV, generateCSV } from "./utils"

export async function importData(config: ImportConfig, fileData: string): Promise<any> {
  try {
    // Parse data based on format
    const data = config.format === "csv" 
      ? parseCSV(fileData)
      : JSON.parse(fileData)

    // Validate data if required
    if (config.validateData) {
      const isValid = await validateData(data, config.source)
      if (!isValid) {
        throw new Error("Invalid data format")
      }
    }

    return data
  } catch (error) {
    throw new Error(`Import failed: ${error}`)
  }
}

export async function exportData(config: ExportConfig, data: any): Promise<string> {
  try {
    // Filter data by date range if specified
    let exportData = data
    if (config.dateRange) {
      exportData = filterByDateRange(data, config.dateRange)
    }

    // Add metadata if requested
    if (config.includeMetadata) {
      exportData = addMetadata(exportData, config.source)
    }

    // Convert to specified format
    return config.format === "csv"
      ? generateCSV(exportData)
      : JSON.stringify(exportData, null, 2)
  } catch (error) {
    throw new Error(`Export failed: ${error}`)
  }
}

function filterByDateRange(data: any[], dateRange: { start?: Date; end?: Date }): any[] {
  return data.filter(item => {
    const itemDate = new Date(item.date || item.timestamp)
    if (dateRange.start && itemDate < dateRange.start) return false
    if (dateRange.end && itemDate > dateRange.end) return false
    return true
  })
}

function addMetadata(data: any, source: DataSource): any {
  return {
    metadata: {
      source,
      exportDate: new Date().toISOString(),
      recordCount: data.length,
    },
    data,
  }
}