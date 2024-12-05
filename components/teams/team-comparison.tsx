"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const comparisonData = [
  { metric: "Goals", team: 68, league: 52 },
  { metric: "Possession", team: 58, league: 50 },
  { metric: "Shots", team: 425, league: 380 },
  { metric: "Pass Accuracy", team: 85, league: 78 },
  { metric: "Clean Sheets", team: 18, league: 12 },
]

export function TeamComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>League Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <XAxis
                dataKey="metric"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Bar
                dataKey="team"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="league"
                fill="hsl(var(--muted))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}