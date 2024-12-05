"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface PlayerStatsProps {
  playerId: string
}

export function PlayerStats({ playerId }: PlayerStatsProps) {
  // Mock data - replace with actual API call
  const stats = {
    matches: 28,
    goals: 22,
    assists: 5,
    minutesPlayed: 2520,
    shotsOnTarget: 48,
    passAccuracy: 78.5,
    tackles: 15,
    interceptions: 8,
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <CardTitle>Matches</CardTitle>
          <CardDescription>Total appearances</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.matches}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Goals</CardTitle>
          <CardDescription>Total goals scored</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.goals}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Assists</CardTitle>
          <CardDescription>Goal assists</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.assists}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Minutes</CardTitle>
          <CardDescription>Minutes played</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.minutesPlayed}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Shots on Target</CardTitle>
          <CardDescription>Accurate shots</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.shotsOnTarget}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pass Accuracy</CardTitle>
          <CardDescription>Successful passes</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.passAccuracy}%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Tackles</CardTitle>
          <CardDescription>Successful tackles</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.tackles}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Interceptions</CardTitle>
          <CardDescription>Ball interceptions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.interceptions}</p>
        </CardContent>
      </Card>
    </div>
  )
}