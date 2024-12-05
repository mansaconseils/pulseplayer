"use client"

import { useState } from "react"
import { Bookmark, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchStore } from "@/lib/search/store"

interface SavedSearchesProps {
  onSelect: () => void
}

export function SavedSearches({ onSelect }: SavedSearchesProps) {
  const [newSearchName, setNewSearchName] = useState("")
  const { savedSearches, setQuery, setFilters, saveSearch, deleteSavedSearch } =
    useSearchStore()

  const handleSave = () => {
    if (!newSearchName.trim()) return

    saveSearch({
      name: newSearchName,
      query: useSearchStore.getState().query,
      filters: useSearchStore.getState().filters,
    })
    setNewSearchName("")
  }

  const handleSelect = (query: string, filters: any) => {
    setQuery(query)
    setFilters(filters)
    onSelect()
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Saved Searches</h3>
      <div className="flex gap-2">
        <Input
          value={newSearchName}
          onChange={(e) => setNewSearchName(e.target.value)}
          placeholder="Name your search"
          className="h-8"
        />
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={handleSave}
          disabled={!newSearchName.trim()}
        >
          <Plus className="mr-2 h-4 w-4" />
          Save Current
        </Button>
      </div>
      <div className="space-y-2">
        {savedSearches.map((search) => (
          <div
            key={search.id}
            className="flex items-center justify-between rounded-md border p-2"
          >
            <Button
              variant="ghost"
              className="h-8 w-full justify-start gap-2 px-2"
              onClick={() => handleSelect(search.query, search.filters)}
            >
              <Bookmark className="h-4 w-4" />
              <span className="truncate">{search.name}</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => deleteSavedSearch(search.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}