import { createApiClient } from "./client"

const client = createApiClient("sports_data")

export async function getMatchStats(matchId: string) {
  return client.get(`/matches/${matchId}/stats`)
}

export async function getPlayerStats(playerId: string) {
  return client.get(`/players/${playerId}/stats`)
}

export async function getTeamStats(teamId: string) {
  return client.get(`/teams/${teamId}/stats`)
}

export async function getLiveMatches() {
  return client.get("/matches/live")
}

export async function getUpcomingMatches() {
  return client.get("/matches/upcoming")
}

export async function getMatchTimeline(matchId: string) {
  return client.get(`/matches/${matchId}/timeline`)
}