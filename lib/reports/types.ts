import { z } from "zod"

export const reportFormatSchema = z.enum([
  "pdf",
  "excel",
  "csv",
  "json",
])

export const reportTemplateSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  sections: z.array(z.string()),
  charts: z.array(z.string()),
  metrics: z.array(z.string()),
  format: reportFormatSchema,
  schedule: z.object({
    enabled: z.boolean(),
    frequency: z.enum(["daily", "weekly", "monthly"]),
    time: z.string().optional(),
    dayOfWeek: z.number().optional(),
    dayOfMonth: z.number().optional(),
  }).optional(),
})

export type ReportFormat = z.infer<typeof reportFormatSchema>
export type ReportTemplate = z.infer<typeof reportTemplateSchema>

export const reportDataSchema = z.object({
  performance: z.object({
    rating: z.number(),
    goals: z.number(),
    assists: z.number(),
    minutesPlayed: z.number(),
  }),
  social: z.object({
    followers: z.number(),
    engagement: z.number(),
    posts: z.number(),
  }),
  media: z.object({
    mentions: z.number(),
    sentiment: z.number(),
    articles: z.number(),
  }),
})

export type ReportData = z.infer<typeof reportDataSchema>