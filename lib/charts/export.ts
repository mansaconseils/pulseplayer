export async function exportChartAsImage(
  chartRef: HTMLElement,
  fileName: string = "chart"
): Promise<void> {
  try {
    const canvas = await html2canvas(chartRef)
    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = `${fileName}.png`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error("Failed to export chart:", error)
  }
}

export function exportChartData(
  data: any[],
  fileName: string = "chart-data"
): void {
  try {
    const csvContent = convertToCSV(data)
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${fileName}.csv`
    link.click()
  } catch (error) {
    console.error("Failed to export data:", error)
  }
}

function convertToCSV(data: any[]): string {
  const headers = Object.keys(data[0])
  const rows = data.map(obj => 
    headers.map(header => JSON.stringify(obj[header])).join(",")
  )
  return [
    headers.join(","),
    ...rows
  ].join("\n")
}