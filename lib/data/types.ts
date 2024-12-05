import { z } from "zod"

export const dataSourceSchema = z.enum([
  "performance",
  "social",
  "media",
  "matches",
  "teams",
])

export const backupMetadataSchema = z.object({
  id: z.string(),
  timestamp: z.date(),
  source: dataSourceSchema,
  size: z.number(),
  checksum: z.string(),
})

export const importConfigSchema = z.object({
  source: dataSourceSchema,
  format: z.enum(["json", "csv"]),
  validateData: z.boolean(),
  overwrite: z.boolean(),
})

export const exportConfigSchema = z.object({
  source: dataSourceSchema,
  format: z.enum(["json", "csv"]),
  includeMetadata: z.boolean(),
  dateRange: z.object({
    start: z.date().optional(),
    end: z.date().optional(),
  }).optional(),
})

export type DataSource = z.infer<typeof dataSourceSchema>
export type BackupMetadata = z.infer<typeof backupMetadataSchema>
export type ImportConfig = z.infer<typeof importConfigSchema>
export type ExportConfig = z.infer<typeof exportConfigSchema>