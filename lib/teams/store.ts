import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Formation, TeamStats, SquadAnalysis } from "./types"

interface TeamStore {
  selectedTeam: string | null
  formations: Formation[]
  teamStats: Record<string, TeamStats>
  squadAnalysis: Record<string, SquadAnalysis>
  
  // Actions
  setSelectedTeam: (teamId: string | null) => void
  addFormation: (formation: Formation) => void
  updateFormation: (index: number, formation: Formation) => void
  deleteFormation: (index: number) => void
  updateTeamStats: (teamId: string, stats: TeamStats) => void
  updateSquadAnalysis: (teamId: string, analysis: SquadAnalysis) => void
}

export const useTeamStore = create<TeamStore>()(
  persist(
    (set) => ({
      selectedTeam: null,
      formations: [],
      teamStats: {},
      squadAnalysis: {},

      setSelectedTeam: (teamId) => set({ selectedTeam: teamId }),
      
      addFormation: (formation) => set((state) => ({
        formations: [...state.formations, formation],
      })),

      updateFormation: (index, formation) => set((state) => ({
        formations: state.formations.map((f, i) =>
          i === index ? formation : f
        ),
      })),

      deleteFormation: (index) => set((state) => ({
        formations: state.formations.filter((_, i) => i !== index),
      })),

      updateTeamStats: (teamId, stats) => set((state) => ({
        teamStats: { ...state.teamStats, [teamId]: stats },
      })),

      updateSquadAnalysis: (teamId, analysis) => set((state) => ({
        squadAnalysis: { ...state.squadAnalysis, [teamId]: analysis },
      })),
    }),
    {
      name: "team-store",
    }
  )
)