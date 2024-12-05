import { z } from "zod"

export const formationSchema = z.object({
  name: z.string(),
  positions: z.array(z.object({
    x: z.number(),
    y: z.number(),
    role: z.string(),
    playerId: z.string().optional(),
  })),
})

export const teamStatsSchema = z.object({
  possession: z.number(),
  shots: z.number(),
  shotsOnTarget: z.number(),
  passes: z.number(),
  passAccuracy: z.number(),
  tackles: z.number(),
  fouls: z.number(),
  yellowCards: z.number(),
  redCards: z.number(),
  goals: z.number(),
  goalsAgainst: z.number(),
})

export const squadAnalysisSchema = z.object({
  averageAge: z.number(),
  averageHeight: z.number(),
  averageExperience: z.number(),
  positionBalance: z.record(z.string(), z.number()),
  depthChart: z.record(z.string(), z.array(z.string())),
})

export type Formation = z.infer<typeof formationSchema>
export type TeamStats = z.infer<typeof teamStatsSchema>
export type SquadAnalysis = z.infer<typeof squadAnalysisSchema>