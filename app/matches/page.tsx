"use client"

import { Suspense } from "react"
import { MatchSelector } from "@/components/matches/match-selector"
import { MatchStatistics } from "@/components/matches/match-statistics"
import { PlayByPlay } from "@/components/matches/play-by-play"
import { HeatmapAnalysis } from "@/components/matches/heatmap-analysis"
import { PlayerPositions } from "@/components/matches/player-positions"
import { MatchHighlights } from "@/components/matches/match-highlights"
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton"

export default function MatchesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Match Analysis</h1>
          <p className="text-muted-foreground">
            Detailed match statistics and player performance
          </p>
        </div>
        <MatchSelector />
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <MatchStatistics />
        
        <div className="grid gap-4 md:grid-cols-2">
          <PlayByPlay />
          <HeatmapAnalysis />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <PlayerPositions />
          <MatchHighlights />
        </div>
      </Suspense>
    </div>
  )
}