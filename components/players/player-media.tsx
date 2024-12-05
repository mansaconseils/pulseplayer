"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PlayerMediaProps {
  playerId: string
}

export function PlayerMedia({ playerId }: PlayerMediaProps) {
  // Mock data - replace with actual API call
  const mediaData = {
    articles: [
      {
        title: "Haaland's Record-Breaking Performance",
        source: "Sports Weekly",
        date: "2 hours ago",
        sentiment: "Positive",
      },
      {
        title: "City Striker Continues Goal Scoring Form",
        source: "Football News",
        date: "1 day ago",
        sentiment: "Positive",
      },
      {
        title: "Analysis: Impact on Premier League",
        source: "Soccer Analytics",
        date: "2 days ago",
        sentiment: "Neutral",
      },
    ],
    metrics: {
      totalMentions: 1324,
      positivePercentage: 75,
      negativePercentage: 8,
      neutralPercentage: 17,
    },
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Media Coverage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">Total Mentions</p>
              <p className="text-2xl font-bold">{mediaData.metrics.totalMentions}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Positive</p>
              <p className="text-2xl font-bold">{mediaData.metrics.positivePercentage}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Negative</p>
              <p className="text-2xl font-bold">{mediaData.metrics.negativePercentage}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Neutral</p>
              <p className="text-2xl font-bold">{mediaData.metrics.neutralPercentage}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mediaData.articles.map((article, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{article.title}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{article.source}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>
                </div>
                <Badge variant={
                  article.sentiment === "Positive" ? "default" :
                  article.sentiment === "Negative" ? "destructive" : "secondary"
                }>
                  {article.sentiment}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}