import { Badge } from "@/components/ui/badge"
import { AppleCard } from "@/components/ui/apple-card"
import { MacroCategory, getFrameworksByMacroCategory, getDifficultyColor } from "@/data/frameworks"

interface CategoryFrameworksProps {
  category: MacroCategory
  frameworks: any[]
  isVisible: boolean
}

export function CategoryFrameworks({ category, frameworks, isVisible }: CategoryFrameworksProps) {
  const categoryFrameworks = getFrameworksByMacroCategory(category.id)
  const IconComponent = category.icon

  return (
    <div 
      id={`category-${category.id}`}
      className={`scroll-mt-24 transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Category Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className={`p-3 rounded-2xl ${
            category.id === 'fondamentali' ? 'bg-blue-600' :
            category.id === 'business' ? 'bg-emerald-600' :
            category.id === 'creativi' ? 'bg-purple-600' :
            category.id === 'avanzati' ? 'bg-orange-600' :
            category.id === 'problem-solving' ? 'bg-pink-600' : 'bg-blue-600'
          }`}>
            <IconComponent className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {category.name}
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {category.description}
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {category.categories.map((cat) => (
            <Badge key={cat} variant="outline" className="text-sm">
              {cat}
            </Badge>
          ))}
        </div>
      </div>

      {/* Frameworks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categoryFrameworks.map((framework, index) => (
          <AppleCard
            key={framework.id}
            {...framework}
            difficultyColor={getDifficultyColor(framework.difficulty)}
            isVisible={isVisible}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}