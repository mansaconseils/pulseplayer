import { create } from "zustand"
import { persist } from "zustand/middleware"
import { SearchFilters, SearchHistoryItem, SavedSearch } from "./types"

interface SearchStore {
  // Current search state
  query: string
  filters: SearchFilters
  
  // History and saved searches
  searchHistory: SearchHistoryItem[]
  savedSearches: SavedSearch[]
  
  // Actions
  setQuery: (query: string) => void
  setFilters: (filters: SearchFilters) => void
  addToHistory: (item: Omit<SearchHistoryItem, "id" | "timestamp">) => void
  saveSearch: (search: Omit<SavedSearch, "id">) => void
  deleteSavedSearch: (id: string) => void
  clearHistory: () => void
}

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      // Initial state
      query: "",
      filters: {},
      searchHistory: [],
      savedSearches: [],

      // Actions
      setQuery: (query) => set({ query }),
      setFilters: (filters) => set({ filters }),
      
      addToHistory: (item) => set((state) => ({
        searchHistory: [
          {
            id: crypto.randomUUID(),
            timestamp: new Date(),
            ...item,
          },
          ...state.searchHistory.slice(0, 9), // Keep last 10 searches
        ],
      })),

      saveSearch: (search) => set((state) => ({
        savedSearches: [
          ...state.savedSearches,
          {
            id: crypto.randomUUID(),
            ...search,
          },
        ],
      })),

      deleteSavedSearch: (id) => set((state) => ({
        savedSearches: state.savedSearches.filter((s) => s.id !== id),
      })),

      clearHistory: () => set({ searchHistory: [] }),
    }),
    {
      name: "player-search-store",
    }
  )
)