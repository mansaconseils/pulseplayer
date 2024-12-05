import { parse, unparse } from "papaparse"

export async function generateChecksum(data: any): Promise<string> {
  const text = JSON.stringify(data)
  const msgBuffer = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("")
}

export function parseCSV(csvData: string): any[] {
  const result = parse(csvData, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  })
  return result.data
}

export function generateCSV(data: any[]): string {
  return unparse(data, {
    quotes: true,
    header: true,
  })
}

export function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"]
  let size = bytes
  let unitIndex = 0
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`
}