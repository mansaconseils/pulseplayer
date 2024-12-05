import { createApiClient } from "./client"

const client = createApiClient("social_media")

export async function getPlayerSocialStats(playerId: string) {
  return client.get(`/players/${playerId}/social`)
}

export async function getPlayerPosts(playerId: string) {
  return client.get(`/players/${playerId}/posts`)
}

export async function getEngagementMetrics(playerId: string) {
  return client.get(`/players/${playerId}/engagement`)
}

export async function getSocialTrends(playerId: string) {
  return client.get(`/players/${playerId}/trends`)
}

export async function getHashtagAnalytics(hashtag: string) {
  return client.get(`/hashtags/${hashtag}/analytics`)
}