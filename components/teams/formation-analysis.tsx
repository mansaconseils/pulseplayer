"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formations = [
  { id: "433", name: "4-3-3" },
  { id: "442", name: "4-4-2" },
  { id: "352", name: "3-5-2" },
]

export function FormationAnalysis() {
  const [selectedFormation, setSelectedFormation] = useState(formations[0].id)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Formation Analysis</CardTitle>
        <Select value={selectedFormation} onValueChange={setSelectedFormation}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Formation" />
          </SelectTrigger>
          <SelectContent>
            {formations.map((formation) => (
              <SelectItem key={formation.id} value={formation.id}>
                {formation.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px] w-full rounded-lg border bg-[url('/pitch.svg')] bg-cover bg-center bg-no-repeat">
          {/* Formation visualization would go here */}
        </div>
      </CardContent>
    </Card>
  )
}