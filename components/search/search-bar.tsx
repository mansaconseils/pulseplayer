"use client"

import { useState } from "react"
import { Search, History, Bookmark, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useSearchStore } from "@/lib/search/store"
import { SearchHistory } from "./search-history"
import { SavedSearches } from "./saved-searches"

export function SearchBar() {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)
  const { query, setQuery } = useSearchStore()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Add to history
    useSearchStore.getState().addToHistory({
      query,
      filters: useSearchStore.getState().filters,
    })
  }

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search players..."
            className="pl-9 pr-12"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <History className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Search History & Saved Searches</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <SearchHistory onSelect={() => setIsHistoryOpen(false)} />
              <SavedSearches onSelect={() => setIsHistoryOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </div>
  )
}