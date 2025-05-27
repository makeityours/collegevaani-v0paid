"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Filter, MapPin, DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchEngine } from "@/lib/search/search-engine"
import { useDebounce } from "@/lib/hooks/use-debounce"

interface AdvancedSearchProps {
  onSearch: (filters: any) => void
  initialFilters?: any
}

export function AdvancedSearch({ onSearch, initialFilters = {} }: AdvancedSearchProps) {
  const [filters, setFilters] = useState({
    query: "",
    location: "",
    type: "",
    fees: { min: 0, max: 1000000 },
    rating: 0,
    facilities: [],
    ...initialFilters,
  })

  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  const debouncedQuery = useDebounce(filters.query, 300)

  // Get autocomplete suggestions
  useEffect(() => {
    if (debouncedQuery.length >= 2) {
      SearchEngine.autocomplete(debouncedQuery, "colleges").then(setSuggestions)
    } else {
      setSuggestions([])
    }
  }, [debouncedQuery])

  // Handle search
  const handleSearch = () => {
    onSearch(filters)
    setShowSuggestions(false)
  }

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setFilters((prev) => ({ ...prev, query: suggestion }))
    setShowSuggestions(false)
    onSearch({ ...filters, query: suggestion })
  }

  const facilities = [
    "Hostel",
    "Library",
    "Sports Complex",
    "Labs",
    "Cafeteria",
    "Gym",
    "Wi-Fi",
    "Auditorium",
    "Medical Center",
    "Transport",
  ]

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="relative" ref={searchRef}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search colleges, courses, or locations..."
            value={filters.query}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, query: e.target.value }))
              setShowSuggestions(true)
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch()
              }
            }}
            className="pl-9 pr-20"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}>
              <Filter className="h-4 w-4" />
            </Button>
            <Button type="button" size="sm" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>

        {/* Autocomplete Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <Card className="absolute top-full left-0 right-0 z-50 mt-1">
            <CardContent className="p-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 hover:bg-muted rounded-md transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Search className="inline h-3 w-3 mr-2 text-muted-foreground" />
                  {suggestion}
                </button>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Advanced Filters */}
      {isAdvancedOpen && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Advanced Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Location and Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </label>
                <Input
                  placeholder="City or State"
                  value={filters.location}
                  onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">College Type</label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => setFilters((prev) => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="deemed">Deemed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Fees Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Annual Fees Range
              </label>
              <div className="px-3">
                <Slider
                  value={[filters.fees.min, filters.fees.max]}
                  onValueChange={([min, max]) => setFilters((prev) => ({ ...prev, fees: { min, max } }))}
                  max={1000000}
                  min={0}
                  step={10000}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>₹{filters.fees.min.toLocaleString()}</span>
                  <span>₹{filters.fees.max.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Facilities */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Facilities</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {facilities.map((facility) => (
                  <div key={facility} className="flex items-center space-x-2">
                    <Checkbox
                      id={facility}
                      checked={filters.facilities.includes(facility)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFilters((prev) => ({
                            ...prev,
                            facilities: [...prev.facilities, facility],
                          }))
                        } else {
                          setFilters((prev) => ({
                            ...prev,
                            facilities: prev.facilities.filter((f: string) => f !== facility),
                          }))
                        }
                      }}
                    />
                    <label htmlFor={facility} className="text-sm">
                      {facility}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            {(filters.location || filters.type || filters.facilities.length > 0) && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Active Filters</label>
                <div className="flex flex-wrap gap-2">
                  {filters.location && (
                    <Badge variant="secondary" className="gap-1">
                      Location: {filters.location}
                      <button
                        onClick={() => setFilters((prev) => ({ ...prev, location: "" }))}
                        className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {filters.type && (
                    <Badge variant="secondary" className="gap-1">
                      Type: {filters.type}
                      <button
                        onClick={() => setFilters((prev) => ({ ...prev, type: "" }))}
                        className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </Badge>
                  )}
                  {filters.facilities.map((facility: string) => (
                    <Badge key={facility} variant="secondary" className="gap-1">
                      {facility}
                      <button
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            facilities: prev.facilities.filter((f: string) => f !== facility),
                          }))
                        }
                        className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleSearch} className="flex-1">
                Apply Filters
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setFilters({
                    query: "",
                    location: "",
                    type: "",
                    fees: { min: 0, max: 1000000 },
                    rating: 0,
                    facilities: [],
                  })
                  onSearch({})
                }}
              >
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
