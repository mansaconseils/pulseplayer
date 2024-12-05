"use client"

import { Clock, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSearchStore } from "@/lib/search/store"
import { formatDistanceToNow } from "date-fns"

interface SearchHistoryProps {
  onSelect: () => void
}

export function SearchHistory({ onSelect }: SearchHistoryProps) {
  const { searchHistory, setQuery, setFilters, clearHistory } = useSearchStore()

  const handleSelect = (query: string, filters: any) => {
    setQuery(query)
    setFilters(filters)
    onSelect()
  }

  if (searchHistory.length === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        No search history
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Recent Searches</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-muted-foreground"
          onClick={clearHistory}
        >
          Clear History
        </Button>
      </div>
      <div className="space-y-2">
        {searchHistory.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-md border p-2"
          >
            <Button
              variant="ghost"
              className="h-8 w-full justify-start gap-2 px-2"
              onClick={() => handleSelect(item.query, item.filters)}
            >
              <Search className="h-4 w-4" />
              <span className="truncate">{item.query}</span>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(item.timestamp, { addSuffix: true })}
              </span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}