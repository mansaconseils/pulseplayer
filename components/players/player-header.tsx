"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit2, Save } from "lucide-react"
import { PlayerEditDialog } from "@/components/players/player-edit-dialog"

interface PlayerHeaderProps {
  playerId: string
}

export function PlayerHeader({ playerId }: PlayerHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)

  // Mock data - replace with actual API call
  const player = {
    name: "Erling Haaland",
    team: "Manchester City",
    position: "Forward",
    age: 23,
    nationality: "Norway",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&h=150&fit=crop",
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={player.image} alt={player.name} />
              <AvatarFallback>{player.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{player.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <Badge variant="secondary">{player.position}</Badge>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{player.team}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{player.nationality}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{player.age} years</span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <PlayerEditDialog
        player={player}
        open={isEditing}
        onOpenChange={setIsEditing}
      />
    </Card>
  )
}