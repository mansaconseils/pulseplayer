"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play } from "lucide-react"

const highlights = [
  {
    time: "23'",
    title: "Goal by Haaland",
    description: "Powerful strike from inside the box",
    type: "goal",
  },
  {
    time: "45'",
    title: "Great Save",
    description: "Ederson with a fantastic diving save",
    type: "save",
  },
  {
    time: "67'",
    title: "Goal by Foden",
    description: "Beautiful team play finished by Foden",
    type: "goal",
  },
  {
    time: "78'",
    title: "Chance Missed",
    description: "Close range shot goes wide",
    type: "chance",
  },
]

export function MatchHighlights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Match Highlights</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 rounded-lg border p-4"
              >
                <Badge variant="outline" className="w-12">
                  {highlight.time}
                </Badge>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{highlight.title}</p>
                    <Badge
                      variant={
                        highlight.type === "goal"
                          ? "default"
                          : highlight.type === "save"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {highlight.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {highlight.description}
                  </p>
                </div>
                <button className="rounded-full p-2 hover:bg-muted">
                  <Play className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}