"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Target, Timer } from "lucide-react"

const metrics = [
  {
    title: "Average Goals",
    value: "1.8",
    change: "+0.3",
    icon: Trophy,
  },
  {
    title: "Shot Accuracy",
    value: "68%",
    change: "+5%",
    icon: Target,
  },
  {
    title: "Minutes Played",
    value: "85.2",
    change: "+2.1",
    icon: Timer,
  },
]

export function PerformanceMetrics() {
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