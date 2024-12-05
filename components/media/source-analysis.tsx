"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const sourceData = [
  { name: "Sports News", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Major News", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Team Sites", value: 20, color: "hsl(var(--chart-3))" },
  { name: "Blogs", value: 15, color: "hsl(var(--chart-4))" },
  { name: "Social", value: 5, color: "hsl(var(--chart-5))" },
]

export function SourceAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Coverage by Source</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}