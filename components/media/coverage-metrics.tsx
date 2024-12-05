"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Newspaper, BarChart2, Award } from "lucide-react"

const metrics = [
  {
    title: "Total Articles",
    value: "1,324",
    change: "+201",
    icon: Newspaper,
  },
  {
    title: "Average Sentiment",
    value: "78%",
    change: "+5%",
    icon: BarChart2,
  },
  {
    title: "Source Quality",
    value: "8.4",
    change: "+0.3",
    icon: Award,
  },
]

export function CoverageMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => {
        const Icon = metric.icon
        const isPositive = metric.change.startsWith("+")
        const TrendIcon = isPositive ? TrendingUp : TrendingDown
        
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
              <div className="flex items-center space-x-2">
                <Badge variant={isPositive ? "default" : "destructive"}>
                  <TrendIcon className="mr-1 h-3 w-3" />
                  {metric.change}
                </Badge>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}