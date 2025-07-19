"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, TestTube, Microscope, Heart, Eye, Brain } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  title: string
  category: string
  description: string
  price: string
  icon: React.ComponentType<{ className?: string }>
}

const searchData: SearchResult[] = [
  {
    id: "1",
    title: "Complete Blood Count (CBC)",
    category: "Blood Tests",
    description: "Comprehensive blood analysis including RBC, WBC, platelets",
    price: "$45",
    icon: TestTube,
  },
  {
    id: "2",
    title: "Lipid Profile",
    category: "Blood Tests",
    description: "Cholesterol and triglyceride levels assessment",
    price: "$35",
    icon: Heart,
  },
  {
    id: "3",
    title: "Thyroid Function Test",
    category: "Hormone Tests",
    description: "TSH, T3, T4 levels for thyroid health",
    price: "$55",
    icon: Brain,
  },
  {
    id: "4",
    title: "Urine Analysis",
    category: "Urine Tests",
    description: "Complete urine examination for kidney health",
    price: "$25",
    icon: Microscope,
  },
  {
    id: "5",
    title: "Liver Function Test",
    category: "Blood Tests",
    description: "ALT, AST, bilirubin levels assessment",
    price: "$40",
    icon: TestTube,
  },
  {
    id: "6",
    title: "Eye Examination",
    category: "Imaging",
    description: "Comprehensive eye health checkup",
    price: "$60",
    icon: Eye,
  },
  {
    id: "7",
    title: "Diabetes Panel",
    category: "Blood Tests",
    description: "Blood glucose and HbA1c testing",
    price: "$50",
    icon: TestTube,
  },
  {
    id: "8",
    title: "Kidney Function Test",
    category: "Blood Tests",
    description: "Creatinine and BUN levels assessment",
    price: "$38",
    icon: Microscope,
  },
]

export function SearchFunctionality() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query.length > 0) {
      const filteredResults = searchData.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filteredResults)
      setIsOpen(true)
      setSelectedIndex(-1)
    } else {
      setResults([])
      setIsOpen(false)
    }
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelectResult(results[selectedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  const handleSelectResult = (result: SearchResult) => {
    setQuery(result.title)
    setIsOpen(false)
    // Here you would typically navigate to the test details or add to cart
    console.log("Selected:", result)
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for tests, services, or health packages..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto shadow-lg border-2">
          <CardContent className="p-0">
            {results.map((result, index) => {
              const IconComponent = result.icon
              return (
                <div
                  key={result.id}
                  onClick={() => handleSelectResult(result)}
                  className={cn(
                    "flex items-center gap-4 p-4 cursor-pointer border-b last:border-b-0 transition-colors",
                    selectedIndex === index ? "bg-blue-50" : "hover:bg-gray-50",
                  )}
                >
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <IconComponent className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{result.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {result.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{result.description}</p>
                  </div>
                  <div className="text-lg font-bold text-blue-600">{result.price}</div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      )}

      {isOpen && results.length === 0 && query.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 shadow-lg border-2">
          <CardContent className="p-4 text-center text-gray-500">No tests or services found for "{query}"</CardContent>
        </Card>
      )}
    </div>
  )
}
