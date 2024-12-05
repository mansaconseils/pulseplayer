"use client"

import { SearchBar } from "@/components/search/search-bar"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchResults } from "@/components/search/search-results"

export default function PlayersPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Players</h1>
          <p className="text-muted-foreground">
            Search and filter player profiles
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <SearchBar />
        </div>
        <SearchFilters />
      </div>

      <SearchResults />
    </div>
  )
}