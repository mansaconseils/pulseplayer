import { create } from "zustand"
import { persist } from "zustand/middleware"
import { MatchEvent, HeatmapData, MatchStatistics } from "./types"

interface MatchStore {
  selectedMatch: string | null
  events: MatchEvent[]
  heatmaps: Record<string, HeatmapData>
  statistics: Record<string, MatchStatistics>
  
  // Actions
  setSelectedMatch: (matchId: string | null) => void
  addEvent: (event: MatchEvent) => void
  updateHeatmap: (playerId: string, data: HeatmapData) => void
  updateStatistics: (matchId: string, stats: MatchStatistics) => void
}

export const useMatchStore = create<MatchStore>()(
  persist(
    (set) => ({
      selectedMatch: null,
      events: [],
      heatmaps: {},
      statistics: {},

      setSelectedMatch: (matchId) => set({ selectedMatch: matchId }),
      
      addEvent: (event) => set((state) => ({
        events: [...state.events, event],
      })),

      updateHeatmap: (playerId, data) => set((state) => ({
        heatmaps: { ...state.heatmaps, [playerId]: data },
      })),

      updateStatistics: (matchId, stats) => set((state) => ({
        statistics: { ...state.statistics, [matchId]: stats },
      })),
    }),
    {
      name: "match-store",
    }
  )
)