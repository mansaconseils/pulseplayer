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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Share2, MessageCircle, Twitter, Instagram } from "lucide-react"

const posts = [
  {
    id: "1",
    platform: "twitter",
    content: "Great win today! Thanks to all the fans for the amazing support! 🏆⚽️",
    timestamp: "2 hours ago",
    likes: 125000,
    shares: 28000,
    comments: 4200,
    sentiment: 0.8,
    player: {
      name: "Erling Haaland",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&h=150&fit=crop",
    },
  },
  {
    id: "2",
    platform: "instagram",
    content: "Training session complete. Always working to improve! 💪",
    timestamp: "5 hours ago",
    likes: 890000,
    shares: 12000,
    comments: 8500,
    sentiment: 0.6,
    player: {
      name: "Kylian Mbappé",
      image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=150&h=150&fit=crop",
    },
  },
]

export function PostFeed() {
  const [platform, setPlatform] = useState<string>("all")

  const filteredPosts = platform === "all" 
    ? posts
    : posts.filter(post => post.platform === platform)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Posts</CardTitle>
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="twitter">Twitter</SelectItem>
            <SelectItem value="instagram">Instagram</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="space-y-4">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={post.player.image} alt={post.player.name} />
                <AvatarFallback>{post.player.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="font-medium">{post.player.name}</p>
                  {post.platform === "twitter" ? (
                    <Twitter className="h-4 w-4 text-sky-500" />
                  ) : (
                    <Instagram className="h-4 w-4 text-pink-500" />
                  )}
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                </div>
                <p>{post.content}</p>
              </div>
              <Badge variant={post.sentiment > 0.5 ? "default" : "secondary"}>
                {(post.sentiment * 100).toFixed(0)}% Positive
              </Badge>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>{(post.likes / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span>{(post.comments / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>{(post.shares / 1000).toFixed(1)}K</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}