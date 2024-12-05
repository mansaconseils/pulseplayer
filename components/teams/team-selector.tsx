"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTeamStore } from "@/lib/teams/store"

const teams = [
  { id: "1", name: "Manchester City" },
  { id: "2", name: "Real Madrid" },
  { id: "3", name: "Bayern Munich" },
  { id: "4", name: "Paris Saint-Germain" },
]

export function TeamSelector() {
  const { selectedTeam, setSelectedTeam } = useTeamStore()

  return (
    <Select
      value={selectedTeam || undefined}
      onValueChange={setSelectedTeam}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select team" />
      </SelectTrigger>
      <SelectContent>
        {teams.map((team) => (
          <SelectItem key={team.id} value={team.id}>
            {team.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}