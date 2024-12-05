"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  Percent,
  Shield,
  Flag,
} from "lucide-react"

const stats = [
  {
    title: "Possession",
    value: "58%",
    comparison: "42%",
    icon: Percent,
  },
  {
    title: "Shots on Target",
    value: "8",
    comparison: "4",
    icon: Target,
  },
  {
    title: "Tackles",
    value: "18",
    comparison: "15",
    icon: Shield,
  },
  {
    title: "Offsides",
    value: "2",
    comparison: "4",
    icon: Flag,
  },
]

export function MatchStatistics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl font-bold">{stat.value}</div>
                <Badge variant="secondary">{stat.comparison}</Badge>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}