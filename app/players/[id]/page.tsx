"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlayerHeader } from "@/components/players/player-header"
import { PlayerStats } from "@/components/players/player-stats"
import { PlayerPerformance } from "@/components/players/player-performance"
import { PlayerSocial } from "@/components/players/player-social"
import { PlayerMedia } from "@/components/players/player-media"

export default function PlayerProfile() {
  const { id } = useParams()

  return (
    <div className="space-y-8">
      <PlayerHeader playerId={id as string} />
      
      <Tabs defaultValue="stats" className="space-y-4">
        <TabsList>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="media">Media Coverage</TabsTrigger>
        </TabsList>

        <TabsContent value="stats" className="space-y-4">
          <PlayerStats playerId={id as string} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <PlayerPerformance playerId={id as string} />
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <PlayerSocial playerId={id as string} />
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <PlayerMedia playerId={id as string} />
        </TabsContent>
      </Tabs>
    </div>
  )
}