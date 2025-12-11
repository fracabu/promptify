import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Target, Compass, Sparkles, Brain, CheckCircle } from "lucide-react"
import Link from "next/link"
import { MacroCategory } from "@/data/frameworks"

interface MacroCategoryCardProps {
  category: MacroCategory
  frameworkCount: number
  isVisible: boolean
  index: number
}

export function MacroCategoryCard({ category, frameworkCount, isVisible, index }: MacroCategoryCardProps) {
  // Fallback icons for each category
  const getFallbackIcon = () => {
    switch(category.id) {
      case 'fondamentali': return Target
      case 'business': return Compass
      case 'creativi': return Sparkles
      case 'avanzati': return Brain
      case 'problem-solving': return CheckCircle
      default: return Target
    }
  }

  const IconComponent = category.icon || getFallbackIcon()

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <Card className="group h-full flex flex-col bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 rounded-2xl overflow-hidden relative">
        {/* Effetto luce hover stile Apple */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 ease-out flex items-center justify-center ${
              category.id === 'fondamentali' ? 'bg-blue-600' :
              category.id === 'business' ? 'bg-emerald-600' :
              category.id === 'creativi' ? 'bg-purple-600' :
              category.id === 'avanzati' ? 'bg-orange-600' :
              category.id === 'problem-solving' ? 'bg-pink-600' : 'bg-blue-600'
            }`}>
              {category.id === 'fondamentali' && <Target className="h-8 w-8 text-white" />}
              {category.id === 'business' && <Compass className="h-8 w-8 text-white" />}
              {category.id === 'creativi' && <Sparkles className="h-8 w-8 text-white" />}
              {category.id === 'avanzati' && <Brain className="h-8 w-8 text-white" />}
              {category.id === 'problem-solving' && <CheckCircle className="h-8 w-8 text-white" />}
            </div>
            <Badge variant="secondary" className="text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0">
              {frameworkCount} framework
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {category.name}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0 flex-1 flex flex-col relative z-10">
          <CardDescription className="text-base text-muted-foreground mb-6 line-clamp-3 flex-1 leading-relaxed">
            {category.description}
          </CardDescription>
          
          <div className="mt-auto">
            <Link href={`#category-${category.id}`}>
              <Button className="w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 ease-out group-hover:scale-105 rounded-xl font-medium">
                Esplora Framework
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}