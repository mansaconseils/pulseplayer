"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, ResponsiveContainer, Tooltip } from "recharts"
import { CustomXAxis, CustomYAxis } from "@/components/charts/custom-axis"
import { LineSeries } from "@/components/charts/line-series"
import { Badge } from "@/components/ui/badge"
import { Brain } from "lucide-react"

const predictionData = [
  { match: "Next", predicted: 8.5, confidence: 0.85 },
  { match: "Week 2", predicted: 8.7, confidence: 0.82 },
  { match: "Week 3", predicted: 8.4, confidence: 0.78 },
  { match: "Week 4", predicted: 8.8, confidence: 0.75 },
  { match: "Week 5", predicted: 8.6, confidence: 0.72 },
]

export function PredictionModel() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Performance Prediction Model</CardTitle>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Brain className="h-3 w-3" />
            AI Powered
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionData}>
                <CustomXAxis dataKey="match" />
                <CustomYAxis domain={[7, 9]} />
                <Tooltip />
                <LineSeries
                  dataKey="predicted"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4">
            <div className="rounded-lg border bg-card p-4">
              <h4 className="font-semibold">Next Match Prediction</h4>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expected Rating</span>
                  <span className="font-medium">{predictionData[0].predicted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Confidence</span>
                  <span className="font-medium">{(predictionData[0].confidence * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <h4 className="font-semibold">Key Factors</h4>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>• Recent form trend</li>
                <li>• Historical performance against opponent</li>
                <li>• Physical condition indicators</li>
                <li>• Team tactical setup</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}