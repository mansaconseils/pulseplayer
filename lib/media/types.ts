import { z } from "zod"

export const mediaArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  source: z.string(),
  url: z.string().url(),
  content: z.string(),
  publishedAt: z.date(),
  sentiment: z.number().min(-1).max(1),
  credibilityScore: z.number().min(0).max(1),
  categories: z.array(z.string()),
  playerIds: z.array(z.string()),
})

export type MediaArticle = z.infer<typeof mediaArticleSchema>

export const mediaCoverageSchema = z.object({
  totalMentions: z.number(),
  sentiment: z.object({
    positive: z.number(),
    negative: z.number(),
    neutral: z.number(),
  }),
  sources: z.array(z.string()),
  topKeywords: z.array(z.string()),
  trend: z.number(),
})

export type MediaCoverage = z.infer<typeof mediaCoverageSchema>