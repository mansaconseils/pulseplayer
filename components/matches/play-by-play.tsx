"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Goal,
  UserPlus2,
  AlertTriangle,
  Timer
} from "lucide-react"

const events = [
  {
    time: "23'",
    type: "goal",
    description: "Goal by Haaland",
    team: "home",
  },
  {
    time: "31'",
    type: "substitution",
    description: "De Bruyne in for Grealish",
    team: "home",
  },
  {
    time: "45'",
    type: "card",
    description: "Yellow card for Silva",
    team: "home",
  },
  {
    time: "67'",
    type: "goal",
    description: "Goal by Foden",
    team: "home",
  },
]

export function PlayByPlay() {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "goal":
        return Goal
      case "substitution":
        return UserPlus2
      case "card":
        return AlertTriangle
      default:
        return Timer
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Play-by-Play Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {events.map((event, index) => {
              const Icon = getEventIcon(event.type)
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 rounded-lg border p-4"
                >
                  <Badge variant="outline" className="w-12">
                    {event.time}
                  </Badge>
                  <Icon className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">{event.description}</p>
                  </div>
                  <Badge
                    variant={event.team === "home" ? "default" : "secondary"}
                  >
                    {event.team === "home" ? "Home" : "Away"}
                  </Badge>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}