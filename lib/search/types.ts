import { z } from "zod"

export const searchFiltersSchema = z.object({
  position: z.string().optional(),
  team: z.string().optional(),
  nationality: z.string().optional(),
  ageRange: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
  }).optional(),
  performanceRange: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
  }).optional(),
})

export type SearchFilters = z.infer<typeof searchFiltersSchema>

export const searchHistoryItemSchema = z.object({
  id: z.string(),
  query: z.string(),
  filters: searchFiltersSchema,
  timestamp: z.date(),
})

export type SearchHistoryItem = z.infer<typeof searchHistoryItemSchema>

export const savedSearchSchema = z.object({
  id: z.string(),
  name: z.string(),
  query: z.string(),
  filters: searchFiltersSchema,
})

export type SavedSearch = z.infer<typeof savedSearchSchema>