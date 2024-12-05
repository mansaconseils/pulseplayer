"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface PlayerTableProps {
  searchQuery: string
}

const players = [
  {
    id: "1",
    name: "Erling Haaland",
    team: "Manchester City",
    position: "Forward",
    age: 23,
    nationality: "Norway",
    performance: 9.2,
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=150&h=150&fit=crop",
  },
  {
    id: "2",
    name: "Kylian Mbappé",
    team: "Paris Saint-Germain",
    position: "Forward",
    age: 25,
    nationality: "France",
    performance: 9.0,
    image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=150&h=150&fit=crop",
  },
  {
    id: "3",
    name: "Jude Bellingham",
    team: "Real Madrid",
    position: "Midfielder",
    age: 20,
    nationality: "England",
    performance: 8.8,
    image: "https://images.unsplash.com/photo-1560012754-775aa9d11c93?w=150&h=150&fit=crop",
  },
]

export function PlayerTable({ searchQuery }: PlayerTableProps) {
  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.nationality.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Nationality</TableHead>
            <TableHead className="text-right">Performance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPlayers.map((player) => (
            <TableRow key={player.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={player.image} alt={player.name} />
                    <AvatarFallback>{player.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  {player.name}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">{player.position}</Badge>
              </TableCell>
              <TableCell>{player.team}</TableCell>
              <TableCell>{player.age}</TableCell>
              <TableCell>{player.nationality}</TableCell>
              <TableCell className="text-right">
                <Badge variant="outline" className={
                  player.performance >= 9.0 ? "bg-green-100 dark:bg-green-900" :
                  player.performance >= 8.0 ? "bg-blue-100 dark:bg-blue-900" :
                  "bg-yellow-100 dark:bg-yellow-900"
                }>
                  {player.performance.toFixed(1)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}