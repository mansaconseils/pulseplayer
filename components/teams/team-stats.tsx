"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  Target,
  Percent,
  Shield,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

const stats = [
  {
    title: "Goals Scored",
    value: "68",
    change: "+12",
    icon: Trophy,
  },
  {
    title: "Goals Against",
    value: "24",
    change: "-5",
    icon: Shield,
  },
  {
    title: "Shot Accuracy",
    value: "42%",
    change: "+3%",
    icon: Target,
  },
  {
    title: "Possession",
    value: "58%",
    change: "+2%",
    icon: Percent,
  },
]

export function TeamStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const isPositive = stat.change.startsWith("+")
        const TrendIcon = isPositive ? TrendingUp : TrendingDown
        
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2">
                <Badge variant={isPositive ? "default" : "destructive"}>
                  <TrendIcon className="mr-1 h-3 w-3" />
                  {stat.change}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  vs last season
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}