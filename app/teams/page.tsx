"use client"

import { Suspense } from "react"
import { TeamStats } from "@/components/teams/team-stats"
import { SquadAnalysis } from "@/components/teams/squad-analysis"
import { FormationAnalysis } from "@/components/teams/formation-analysis"
import { TeamComparison } from "@/components/teams/team-comparison"
import { TeamPerformance } from "@/components/teams/team-performance"
import { TeamSelector } from "@/components/teams/team-selector"
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton"

export default function TeamsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">
            Analyze team performance and squad composition
          </p>
        </div>
        <TeamSelector />
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <TeamStats />
        
        <div className="grid gap-4 md:grid-cols-2">
          <SquadAnalysis />
          <FormationAnalysis />
        </div>

        <TeamComparison />
        <TeamPerformance />
      </Suspense>
    </div>
  )
}