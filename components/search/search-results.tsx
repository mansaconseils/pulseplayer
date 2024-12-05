"use client"

import { useSearchStore } from "@/lib/search/store"
import { PlayerTable } from "@/components/players/player-table"

export function SearchResults() {
  const { query, filters } = useSearchStore()

  return (
    <div className="space-y-4">
      <PlayerTable searchQuery={query} filters={filters} />
    </div>
  )
}