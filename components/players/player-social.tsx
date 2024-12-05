"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Instagram, Twitter } from "lucide-react"

interface PlayerSocialProps {
  playerId: string
}

export function PlayerSocial({ playerId }: PlayerSocialProps) {
  // Mock data - replace with actual API call
  const socialData = {
    instagram: {
      handle: "@erling.haaland",
      followers: "28.5M",
      engagement: "12.4%",
      posts: 245,
    },
    twitter: {
      handle: "@ErlingHaaland",
      followers: "3.2M",
      engagement: "8.7%",
      posts: 892,
    },
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0">
          <CardTitle className="flex items-center gap-2">
            <Instagram className="h-5 w-5" />
            Instagram
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Handle</p>
            <p className="font-medium">{socialData.instagram.handle}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Followers</p>
            <p className="font-medium">{socialData.instagram.followers}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Engagement Rate</p>
            <p className="font-medium">{socialData.instagram.engagement}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Posts</p>
            <p className="font-medium">{socialData.instagram.posts}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center space-y-0">
          <CardTitle className="flex items-center gap-2">
            <Twitter className="h-5 w-5" />
            Twitter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Handle</p>
            <p className="font-medium">{socialData.twitter.handle}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Followers</p>
            <p className="font-medium">{socialData.twitter.followers}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Engagement Rate</p>
            <p className="font-medium">{socialData.twitter.engagement}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Posts</p>
            <p className="font-medium">{socialData.twitter.posts}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}