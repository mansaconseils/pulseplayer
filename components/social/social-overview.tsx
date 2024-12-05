"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, BarChart2, MessageCircle } from "lucide-react"
import { LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { CustomXAxis, CustomYAxis } from "@/components/charts/custom-axis"
import { LineSeries } from "@/components/charts/line-series"

const metrics = [
  {
    title: "Total Followers",
    value: "31.7M",
    change: "+2.1%",
    icon: Users,
  },
  {
    title: "Engagement Rate",
    value: "8.4%",
    change: "+0.8%",
    icon: BarChart2,
  },
  {
    title: "Average Sentiment",
    value: "0.72",
    change: "+0.05",
    icon: MessageCircle,
  },
]

const trendData = [
  { date: "Mon", followers: 31.2, engagement: 8.1, sentiment: 0.68 },
  { date: "Tue", followers: 31.3, engagement: 8.2, sentiment: 0.70 },
  { date: "Wed", followers: 31.4, engagement: 8.3, sentiment: 0.71 },
  { date: "Thu", followers: 31.5, engagement: 8.2, sentiment: 0.69 },
  { date: "Fri", followers: 31.6, engagement: 8.3, sentiment: 0.71 },
  { date: "Sat", followers: 31.7, engagement: 8.4, sentiment: 0.72 },
]

export function SocialOverview() {
  return (
    <>
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
                  <span className="text-xs text-muted-foreground">vs last week</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CustomXAxis dataKey="date" />
                <CustomYAxis />
                <Tooltip />
                <LineSeries
                  dataKey="engagement"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
                <LineSeries
                  dataKey="sentiment"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </>
  )
}