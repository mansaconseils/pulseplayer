"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    player: "Marcus Rashford",
    team: "Manchester United",
    event: "Scored a goal",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1529119368496-2dfda6ec2804?w=150&h=150&fit=crop",
  },
  {
    player: "Bukayo Saka",
    team: "Arsenal",
    event: "2 assists in a match",
    time: "5 hours ago",
    image: "https://images.unsplash.com/photo-1571988840298-3b5301d5109b?w=150&h=150&fit=crop",
  },
  {
    player: "Phil Foden",
    team: "Manchester City",
    event: "Man of the Match",
    time: "1 day ago",
    image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=150&h=150&fit=crop",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.image} alt={activity.player} />
            <AvatarFallback>{activity.player.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.player}</p>
            <p className="text-sm text-muted-foreground">{activity.event}</p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">{activity.time}</div>
        </div>
      ))}
    </div>
  )
}