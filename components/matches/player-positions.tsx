"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const timePoints = [
  { value: "15", label: "15 min" },
  { value: "30", label: "30 min" },
  { value: "45", label: "45 min" },
  { value: "60", label: "60 min" },
  { value: "75", label: "75 min" },
  { value: "90", label: "90 min" },
]

export function PlayerPositions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Player Positions</CardTitle>
        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Time" />
          </SelectTrigger>
          <SelectContent>
            {timePoints.map((point) => (
              <SelectItem key={point.value} value={point.value}>
                {point.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] w-full rounded-lg border bg-[url('/pitch.svg')] bg-cover bg-center bg-no-repeat">
          {/* Player position visualization would go here */}
        </div>
      </CardContent>
    </Card>
  )
}