"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts"

const squadData = [
  { attribute: "Attack", value: 85 },
  { attribute: "Midfield", value: 82 },
  { attribute: "Defense", value: 78 },
  { attribute: "Experience", value: 75 },
  { attribute: "Youth", value: 70 },
  { attribute: "Depth", value: 80 },
]

export function SquadAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Squad Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={squadData} className="[&_.recharts-polar-grid-angle-line]:stroke-border">
              <PolarGrid className="stroke-border" />
              <PolarAngleAxis
                dataKey="attribute"
                className="text-xs fill-muted-foreground"
              />
              <Radar
                name="Squad"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}