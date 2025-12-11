import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Link from "next/link"

interface AppleCardProps {
  title: string
  description: string
  icon: LucideIcon
  color: string
  category: string
  difficulty: string
  difficultyColor: string
  id: string
  isVisible: boolean
  index: number
}

export function AppleCard({
  title,
  description,
  icon: IconComponent,
  color,
  category,
  difficulty,
  difficultyColor,
  id,
  isVisible,
  index
}: AppleCardProps) {
  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className="group h-full flex flex-col bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 rounded-2xl overflow-hidden relative">
        {/* Effetto luce hover stile Apple */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-3 rounded-2xl ${color || 'bg-slate-600'} group-hover:scale-110 transition-transform duration-300 ease-out`}>
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            <Badge variant="secondary" className="text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-0">
              {category}
            </Badge>
          </div>
          <CardTitle className="text-xl font-semibold text-foreground mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {title}
          </CardTitle>
          <Badge 
            variant="outline" 
            className={`text-xs font-medium w-fit border-0 ${difficultyColor}`}
          >
            {difficulty}
          </Badge>
        </CardHeader>
        
        <CardContent className="pt-0 flex-1 flex flex-col relative z-10">
          <CardDescription className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-1 leading-relaxed">
            {description}
          </CardDescription>
          
          <div className="mt-auto">
            <Link href={`/framework/${id}`}>
              <Button className="w-full bg-gradient-to-r from-slate-900 to-slate-700 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 ease-out group-hover:scale-105 rounded-xl font-medium">
                <Play className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Testa Framework
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}