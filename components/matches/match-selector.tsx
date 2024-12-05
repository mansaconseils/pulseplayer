"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useMatchStore } from "@/lib/matches/store"

const matches = [
  { id: "1", name: "Manchester City vs Chelsea" },
  { id: "2", name: "Arsenal vs Liverpool" },
  { id: "3", name: "Real Madrid vs Barcelona" },
]

export function MatchSelector() {
  const { selectedMatch, setSelectedMatch } = useMatchStore()

  return (
    <Select
      value={selectedMatch || undefined}
      onValueChange={setSelectedMatch}
    >
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Select match" />
      </SelectTrigger>
      <SelectContent>
        {matches.map((match) => (
          <SelectItem key={match.id} value={match.id}>
            {match.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}