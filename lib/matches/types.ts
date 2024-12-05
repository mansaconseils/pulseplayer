import { z } from "zod"

export const matchEventSchema = z.object({
  id: z.string(),
  timestamp: z.number(),
  type: z.enum([
    "goal",
    "assist",
    "shot",
    "pass",
    "tackle",
    "foul",
    "card",
    "substitution"
  ]),
  playerId: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  details: z.record(z.string(), z.any()).optional(),
})

export const heatmapDataSchema = z.object({
  playerId: z.string(),
  positions: z.array(z.object({
    x: z.number(),
    y: z.number(),
    weight: z.number(),
  })),
})

export const matchStatisticsSchema = z.object({
  possession: z.number(),
  shots: z.number(),
  shotsOnTarget: z.number(),
  passes: z.number(),
  passAccuracy: z.number(),
  tackles: z.number(),
  fouls: z.number(),
  corners: z.number(),
  offsides: z.number(),
})

export type MatchEvent = z.infer<typeof matchEventSchema>
export type HeatmapData = z.infer<typeof heatmapDataSchema>
export type MatchStatistics = z.infer<typeof matchStatisticsSchema>