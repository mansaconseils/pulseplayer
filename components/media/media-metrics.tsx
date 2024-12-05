"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Newspaper, TrendingUp, BarChart } from "lucide-react"

const metrics = [
  {
    title: "Total Mentions",
    value: "1,324",
    change: "+201",
    icon: Newspaper,
  },
  {
    title: "Average Sentiment",
    value: "7.8",
    change: "+0.5",
    icon: TrendingUp,
  },
  {
    title: "Engagement Rate",
    value: "24.5%",
    change: "+2.1%",
    icon: BarChart,
  },
]

export function MediaMetrics() {
  return (
    <>
      {metrics.map((metric) => {
        const Icon = metric.icon
        return (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}