import { z } from "zod"

export const performanceMetricSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.number(),
  unit: z.string(),
  trend: z.number(),
  category: z.enum(["physical", "technical", "tactical"]),
})

export type PerformanceMetric = z.infer<typeof performanceMetricSchema>

export const calculateTrend = (current: number, previous: number): number => {
  return ((current - previous) / previous) * 100
}

export const getPerformancePrediction = (
  metrics: PerformanceMetric[],
  weights: Record<string, number>
): number => {
  return metrics.reduce((acc, metric) => {
    const weight = weights[metric.id] || 1
    return acc + (metric.value * weight)
  }, 0) / metrics.length
}