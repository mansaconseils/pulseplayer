import { createApiClient } from "./client"

const client = createApiClient("news")

export async function getPlayerNews(playerId: string) {
  return client.get("/everything", {
    q: `player:${playerId}`,
    sortBy: "publishedAt",
  })
}

export async function getTeamNews(teamId: string) {
  return client.get("/everything", {
    q: `team:${teamId}`,
    sortBy: "publishedAt",
  })
}

export async function getTopFootballNews() {
  return client.get("/top-headlines", {
    category: "sports",
    q: "football OR soccer",
  })
}

export async function searchNews(query: string) {
  return client.get("/everything", {
    q: query,
    sortBy: "relevancy",
  })
}