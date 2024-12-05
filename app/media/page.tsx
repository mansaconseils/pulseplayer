"use client"

import { Suspense } from "react"
import { CoverageMetrics } from "@/components/media/coverage-metrics"
import { CoverageTrends } from "@/components/media/coverage-trends"
import { SourceAnalysis } from "@/components/media/source-analysis"
import { ArticleFeed } from "@/components/media/article-feed"
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton"

export default function MediaPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Media Coverage</h1>
        <p className="text-muted-foreground">
          Track and analyze media coverage and sentiment
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <CoverageMetrics />

        <div className="grid gap-4 md:grid-cols-2">
          <CoverageTrends />
          <SourceAnalysis />
        </div>

        <ArticleFeed />
      </Suspense>
    </div>
  )
}