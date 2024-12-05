"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SlidersHorizontal } from "lucide-react"

export function PlayerFilters() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="ml-auto">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="all">
          <DropdownMenuRadioItem value="all">All Positions</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="forward">Forward</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="midfielder">Midfielder</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="defender">Defender</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="goalkeeper">Goalkeeper</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Performance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="all">
          <DropdownMenuRadioItem value="all">All Ratings</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="9+">9.0 and above</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="8-9">8.0 - 8.9</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="7-8">7.0 - 7.9</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="below-7">Below 7.0</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}