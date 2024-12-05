"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const players = [
  { id: "1", name: "Erling Haaland" },
  { id: "2", name: "Kevin De Bruyne" },
  { id: "3", name: "Phil Foden" },
]

export function HeatmapAnalysis() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Player Heatmap</CardTitle>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select player" />
          </SelectTrigger>
          <SelectContent>
            {players.map((player) => (
              <SelectItem key={player.id} value={player.id}>
                {player.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] w-full rounded-lg border bg-[url('/pitch.svg')] bg-cover bg-center bg-no-repeat">
          {/* Heatmap visualization would go here */}
        </div>
      </CardContent>
    </Card>
  )
}