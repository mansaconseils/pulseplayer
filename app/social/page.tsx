"use client"

import { Suspense } from "react"
import { SocialOverview } from "@/components/social/social-overview"
import { PostFeed } from "@/components/social/post-feed"
import { DashboardSkeleton } from "@/components/skeletons/dashboard-skeleton"

export default function SocialPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Social Media Analytics</h1>
        <p className="text-muted-foreground">
          Track social media performance and engagement
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <SocialOverview />
        <PostFeed />
      </Suspense>
    </div>
  )
}