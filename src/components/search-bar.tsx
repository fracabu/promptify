"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AppleCard } from "@/components/ui/apple-card"
import { frameworks, getDifficultyColor } from "@/data/frameworks"
import { useRouter } from "next/navigation"

interface Framework {
  id: string
  title: string
  description: string
  icon: any
  color: string
  category: string
  difficulty: "Facile" | "Medio" | "Avanzato"
}

interface SearchBarProps {
  size?: "default" | "large"
}

// Funzione per evidenziare il testo cercato
const highlightText = (text: string, highlight: string) => {
  if (!highlight.trim()) return text
  const regex = new RegExp(`(${highlight})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, index) => 
    regex.test(part) ? <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">{part}</mark> : part
  )
}

export function SearchBar({ size = "default" }: SearchBarProps = {}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [filteredFrameworks, setFilteredFrameworks] = useState<Framework[]>([])
  const router = useRouter()

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFrameworks([])
      return
    }

    const filtered = frameworks.filter(framework => 
      framework.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      framework.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      framework.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    
    setFilteredFrameworks(filtered.slice(0, 5)) // Limita a 5 risultati nel dropdown
  }, [searchTerm])

  const getAllFilteredFrameworks = () => {
    if (searchTerm.trim() === "") return []
    return frameworks.filter(framework => 
      framework.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      framework.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      framework.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const handleFrameworkClick = (frameworkId: string) => {
    router.push(`/framework/${frameworkId}`)
    setIsOpen(false)
    setSearchTerm("")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (filteredFrameworks.length > 0) {
      handleFrameworkClick(filteredFrameworks[0].id)
    }
  }

  const inputSize = size === "large" ? "text-lg h-14" : "text-sm h-10"
  const placeholder = size === "large" 
    ? "Cerca framework (es. APE, CRAFT, AIDA)..." 
    : "Cerca framework (es. APE, CRAFT)..."

  return (
    <div className={`relative w-full ${size === "large" ? "max-w-2xl" : "max-w-md"}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${size === "large" ? "h-5 w-5" : "h-4 w-4"} text-muted-foreground`} />
          <Input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className={`pl-12 pr-12 ${inputSize} bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border-slate-200/50 dark:border-slate-700/50`}
          />
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                setSearchTerm("")
                setFilteredFrameworks([])
              }}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${size === "large" ? "h-8 w-8" : "h-6 w-6"}`}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Dropdown risultati */}
      {isOpen && searchTerm && filteredFrameworks.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-lg p-2 max-h-80 overflow-y-auto">
            <div className="space-y-2">
              {filteredFrameworks.map((framework) => {
                const IconComponent = framework.icon
                return (
                  <button
                    key={framework.id}
                    onClick={() => handleFrameworkClick(framework.id)}
                    className="w-full text-left p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 ${framework.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-sm truncate">
                            {highlightText(framework.title, searchTerm)}
                          </h4>
                          <Badge variant="secondary" className="text-xs">
                            {framework.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {highlightText(framework.description, searchTerm)}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Badge className={`text-xs ${getDifficultyColor(framework.difficulty)}`}>
                            {framework.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
              
              {/* Link per vedere tutti i risultati */}
              {getAllFilteredFrameworks().length > 5 && (
                <div className="p-2 border-t">
                  <button
                    onClick={() => {
                      // Qui potremmo navigare a una pagina di risultati completi
                      // Per ora mostriamo un messaggio
                      alert(`Trovati ${getAllFilteredFrameworks().length} framework totali`)
                    }}
                    className="w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:underline py-2"
                  >
                    Vedi tutti i {getAllFilteredFrameworks().length} risultati →
                  </button>
                </div>
              )}
            </div>
            
            {filteredFrameworks.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">
                Nessun framework trovato per "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}