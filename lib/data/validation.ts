import { z } from "zod"
import { DataSource } from "./types"

const validationSchemas: Record<DataSource, z.ZodType<any>> = {
  performance: z.array(z.object({
    playerId: z.string(),
    date: z.string(),
    metrics: z.record(z.string(), z.number()),
  })),

  social: z.array(z.object({
    playerId: z.string(),
    platform: z.string(),
    metrics: z.record(z.string(), z.number()),
    timestamp: z.string(),
  })),

  media: z.array(z.object({
    playerId: z.string(),
    source: z.string(),
    content: z.string(),
    sentiment: z.number(),
    timestamp: z.string(),
  })),

  matches: z.array(z.object({
    matchId: z.string(),
    date: z.string(),
    teams: z.array(z.string()),
    events: z.array(z.object({
      type: z.string(),
      timestamp: z.number(),
      data: z.record(z.string(), z.any()),
    })),
  })),

  teams: z.array(z.object({
    teamId: z.string(),
    name: z.string(),
    players: z.array(z.string()),
    stats: z.record(z.string(), z.number()),
  })),
}

export async function validateData(data: any, source: DataSource): Promise<boolean> {
  try {
    await validationSchemas[source].parseAsync(data)
    return true
  } catch (error) {
    console.error(`Validation error for ${source}:`, error)
    return false
  }
}

export function getValidationSchema(source: DataSource): z.ZodType<any> {
  return validationSchemas[source]
}