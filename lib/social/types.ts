import { z } from "zod"

export const socialPostSchema = z.object({
  id: z.string(),
  platform: z.enum(["twitter", "instagram"]),
  content: z.string(),
  timestamp: z.date(),
  likes: z.number(),
  shares: z.number(),
  comments: z.number(),
  sentiment: z.number().min(-1).max(1),
  engagementRate: z.number(),
})

export type SocialPost = z.infer<typeof socialPostSchema>

export const socialMetricsSchema = z.object({
  followers: z.number(),
  engagement: z.number(),
  posts: z.number(),
  averageSentiment: z.number(),
  recentTrend: z.number(),
})

export type SocialMetrics = z.infer<typeof socialMetricsSchema>