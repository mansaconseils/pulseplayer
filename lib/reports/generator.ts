import { ReportTemplate, ReportData, ReportFormat } from "./types"
import { getPlayerStats } from "@/lib/api/sports-data"
import { getPlayerSocialStats } from "@/lib/api/social-media"
import { getPlayerNews } from "@/lib/api/news"

export async function generateReport(
  template: ReportTemplate,
  playerId: string
): Promise<ReportData> {
  // Fetch data based on template sections
  const [performance, social, media] = await Promise.all([
    getPlayerStats(playerId),
    getPlayerSocialStats(playerId),
    getPlayerNews(playerId),
  ])

  return {
    performance: {
      rating: performance.rating,
      goals: performance.goals,
      assists: performance.assists,
      minutesPlayed: performance.minutesPlayed,
    },
    social: {
      followers: social.followers,
      engagement: social.engagement,
      posts: social.posts,
    },
    media: {
      mentions: media.mentions,
      sentiment: media.sentiment,
      articles: media.articles,
    },
  }
}

export async function exportReport(
  data: ReportData,
  format: ReportFormat,
  filename: string
): Promise<void> {
  switch (format) {
    case "pdf":
      await exportToPDF(data, filename)
      break
    case "excel":
      await exportToExcel(data, filename)
      break
    case "csv":
      await exportToCSV(data, filename)
      break
    case "json":
      await exportToJSON(data, filename)
      break
  }
}

async function exportToPDF(data: ReportData, filename: string) {
  // Implement PDF export
  console.log("Exporting to PDF:", data, filename)
}

async function exportToExcel(data: ReportData, filename: string) {
  // Implement Excel export
  console.log("Exporting to Excel:", data, filename)
}

async function exportToCSV(data: ReportData, filename: string) {
  const rows = [
    // Headers
    ["Category", "Metric", "Value"],
    // Performance
    ["Performance", "Rating", data.performance.rating],
    ["Performance", "Goals", data.performance.goals],
    ["Performance", "Assists", data.performance.assists],
    ["Performance", "Minutes Played", data.performance.minutesPlayed],
    // Social
    ["Social", "Followers", data.social.followers],
    ["Social", "Engagement", data.social.engagement],
    ["Social", "Posts", data.social.posts],
    // Media
    ["Media", "Mentions", data.media.mentions],
    ["Media", "Sentiment", data.media.sentiment],
    ["Media", "Articles", data.media.articles],
  ]

  const csvContent = rows
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n")

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = `${filename}.csv`
  link.click()
}

async function exportToJSON(data: ReportData, filename: string) {
  const jsonContent = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonContent], { type: "application/json" })
  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.download = `${filename}.json`
  link.click()
}