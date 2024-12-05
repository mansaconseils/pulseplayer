"use client"

import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PerformanceMetrics } from "@/components/performance/performance-metrics"
import { AdvancedMetrics } from "@/components/performance/advanced-metrics"
import { PredictionModel } from "@/components/performance/prediction-model"
import { ExportReport } from "@/components/performance/export-report"
import { PerformanceSkeleton } from "@/components/skeletons/performance-skeleton"

export default function PerformancePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance Analytics</h1>
          <p className="text-muted-foreground">
            Advanced performance metrics and predictions
          </p>
        </div>
        <ExportReport />
      </div>

      <Suspense fallback={<PerformanceSkeleton />}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <PerformanceMetrics />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AdvancedMetrics />
          <PredictionModel />
        </div>
      </Suspense>
    </div>
  )
}