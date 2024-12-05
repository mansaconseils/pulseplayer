"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { SlidersHorizontal, X } from "lucide-react"
import { useSearchStore } from "@/lib/search/store"

export function SearchFilters() {
  const { filters, setFilters } = useSearchStore()

  const handleClearFilters = () => {
    setFilters({})
  }

  const activeFiltersCount = Object.keys(filters).length

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80">
          <DropdownMenuLabel>Performance Range</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="p-4">
            <Slider
              defaultValue={[0, 10]}
              max={10}
              step={0.1}
              onValueChange={(value) => {
                setFilters({
                  ...filters,
                  performanceRange: {
                    min: value[0],
                    max: value[1],
                  },
                })
              }}
            />
          </div>
          <DropdownMenuLabel>Age Range</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="p-4">
            <Slider
              defaultValue={[16, 40]}
              min={16}
              max={40}
              step={1}
              onValueChange={(value) => {
                setFilters({
                  ...filters,
                  ageRange: {
                    min: value[0],
                    max: value[1],
                  },
                })
              }}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {activeFiltersCount > 0 && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClearFilters}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}