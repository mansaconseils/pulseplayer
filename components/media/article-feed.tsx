"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const articles = [
  {
    id: "1",
    title: "Star Player's Outstanding Performance Leads Team to Victory",
    source: "Sports Weekly",
    url: "https://example.com/article1",
    publishedAt: "2 hours ago",
    sentiment: 0.8,
    credibilityScore: 0.9,
  },
  {
    id: "2",
    title: "Transfer Rumors: Top Clubs Interested in Rising Star",
    source: "Football News",
    url: "https://example.com/article2",
    publishedAt: "5 hours ago",
    sentiment: 0.6,
    credibilityScore: 0.85,
  },
  {
    id: "3",
    title: "Tactical Analysis: How the Team's Strategy Has Evolved",
    source: "Analytics Hub",
    url: "https://example.com/article3",
    publishedAt: "1 day ago",
    sentiment: 0.7,
    credibilityScore: 0.95,
  },
]

export function ArticleFeed() {
  const [sortBy, setSortBy] = useState("recent")

  const getSortedArticles = () => {
    return [...articles].sort((a, b) => {
      switch (sortBy) {
        case "sentiment":
          return b.sentiment - a.sentiment
        case "credibility":
          return b.credibilityScore - a.credibilityScore
        default:
          return 0 // Default to original order
      }
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Latest Coverage</CardTitle>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="sentiment">Highest Sentiment</SelectItem>
            <SelectItem value="credibility">Highest Credibility</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-6">
        {getSortedArticles().map((article) => (
          <div key={article.id} className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <a 
                  href={article.url}
                  className="font-medium hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.title}
                </a>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>{article.source}</span>
                  <span>•</span>
                  <span>{article.publishedAt}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={article.sentiment > 0.7 ? "default" : "secondary"}>
                  {(article.sentiment * 100).toFixed(0)}% Positive
                </Badge>
                <Badge variant="outline">
                  {(article.credibilityScore * 10).toFixed(1)} Trust Score
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}