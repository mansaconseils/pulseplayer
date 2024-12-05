"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const topPlayers = [
  {
    name: "Erling Haaland",
    team: "Manchester City",
    score: 9.2,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&h=150&fit=crop",
  },
  {
    name: "Kylian Mbappé",
    team: "Paris Saint-Germain",
    score: 9.0,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=150&h=150&fit=crop",
  },
  {
    name: "Jude Bellingham",
    team: "Real Madrid",
    score: 8.8,
    image: "https://images.unsplash.com/photo-1560012754-775aa9d11c93?w=150&h=150&fit=crop",
  },
]

export function TopPlayers() {
  return (
    <div className="space-y-8">
      {topPlayers.map((player, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={player.image} alt={player.name} />
            <AvatarFallback>{player.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{player.name}</p>
            <p className="text-sm text-muted-foreground">{player.team}</p>
          </div>
          <div className="ml-auto font-medium">{player.score}</div>
        </div>
      ))}
    </div>
  )
}