"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const articles = [
  {
    title: "Haaland's Record-Breaking Performance",
    source: "Sports Weekly",
    sentiment: "Positive",
    time: "2 hours ago",
    player: {
      name: "Erling Haaland",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&h=150&fit=crop",
    },
  },
  {
    title: "Mbappé Transfer Speculation Intensifies",
    source: "Football News",
    sentiment: "Neutral",
    time: "5 hours ago",
    player: {
      name: "Kylian Mbappé",
      image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=150&h=150&fit=crop",
    },
  },
  {
    title: "Bellingham's Impact at Real Madrid",
    source: "Madrid Daily",
    sentiment: "Positive",
    time: "1 day ago",
    player: {
      name: "Jude Bellingham",
      image: "https://images.unsplash.com/photo-1560012754-775aa9d11c93?w=150&h=150&fit=crop",
    },
  },
]

export function TrendingArticles() {
  return (
    <div className="space-y-6">
      {articles.map((article, index) => (
        <div key={index} className="flex items-start space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={article.player.image} alt={article.player.name} />
            <AvatarFallback>{article.player.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="font-medium leading-none">{article.title}</p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">{article.source}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{article.time}</span>
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
  )
}