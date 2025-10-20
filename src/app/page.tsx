'use client'

import { Badge } from "@/components/ui/badge"
import { Play, ArrowRight, Brain, Target, Zap, MessageSquare, Lightbulb, Rocket, Settings, Users, TrendingUp, FileText, Award, Compass, CheckCircle, Star, Layers, Eye, GitBranch, Clock, Crosshair, Sparkles, BookOpen, PenTool, BarChart3, UserCheck, Flag, Filter, Search, Map, Anchor, Gauge, ZapOff, ChevronDown } from "lucide-react"
import { AppleBackground } from "@/components/ui/apple-background"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MacroCategoryCard } from "@/components/macro-category-card"
import { CategoryFrameworks } from "@/components/category-frameworks"
import { SearchBar } from "@/components/search-bar"
import { macroCategories, frameworks, getDifficultyColor } from "@/data/frameworks"
import { useEffect, useState } from "react"
import Link from "next/link"

// Componente animato sicuro per SSR
function AnimatedContent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [visibleCategories, setVisibleCategories] = useState<Set<string>>(new Set())

  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const categories = document.querySelectorAll('[id^="category-"]')
      categories.forEach((category) => {
        const rect = category.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 0.8
        if (isVisible) {
          setVisibleCategories(prev => new Set(prev).add(category.id))
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial visibility
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isMounted) {
    // Render statico per SSR
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-blue-950/20 dark:via-slate-900 dark:to-purple-950/20" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl" />
        </div>

        <Header />
        
        {/* Hero Section - Full Screen */}
        <div className="min-h-screen flex items-center justify-center relative">
          <div className="container mx-auto px-4 py-8 relative">
            <div className="text-center mb-8">
              <div className="mb-8">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Framework per prompt efficaci, subito.
              </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light mb-8">
                  Scopri e testa i framework più efficaci per ottimizzare le tue interazioni con l'AI
                </p>
                
                {/* Search Bar Prominente */}
                <div className="flex justify-center">
                  <SearchBar size="large" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Macro Categories Section - Full Height */}
        <div className="min-h-screen flex items-center justify-center py-20 px-4">
          <div className="container mx-auto relative">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Esplora per Categoria
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
              {macroCategories.map((category, index) => (
                <MacroCategoryCard
                  key={category.id}
                  category={category}
                  frameworkCount={frameworks.filter(f => category.categories.includes(f.category)).length}
                  isVisible={false}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Guide Section - Aggiunta alla fine */}
        <div id="guide" className="py-20">
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Guide Utili
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Impara a utilizzare al meglio i framework AI con le nostre guide pratiche
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 rounded-2xl overflow-hidden relative">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Guida Base</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Inizia con i concetti fondamentali del prompt engineering e impara a strutturare i tuoi primi prompt.
                </p>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                  Scopri di più →
                </button>
              </div>

              <div className="p-6 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 rounded-2xl overflow-hidden relative">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Tecniche Avanzate</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Padroneggia le tecniche avanzate di prompt engineering per ottenere risultati superiori.
                </p>
                <button className="text-sm text-purple-600 dark:text-purple-400 hover:underline">
                  Approfondisci →
                </button>
              </div>

              <div className="p-6 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 rounded-2xl overflow-hidden relative">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Best Practices</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Scopri le best practices e i trucchi professionali usati dagli esperti del settore.
                </p>
                <button className="text-sm text-green-600 dark:text-green-400 hover:underline">
                  Inizia ora →
                </button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  // Render animato per client
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">
      <AppleBackground />

      <Header />

      {/* Hero Section - Full Screen */}
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="container mx-auto px-4 py-8 relative">
          <div className={`text-center transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Framework per prompt efficaci ed efficienti
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light mb-8">
                Scopri e testa i framework più efficaci per ottimizzare le tue interazioni con l'AI
              </p>
              
              {/* Search Bar Prominente */}
              <div className={`flex justify-center transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: '500ms' }}>
                <SearchBar size="large" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '1500ms' }}>
          <button
            onClick={() => {
              const element = document.getElementById('categories')
              element?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span className="text-sm mb-2 group-hover:translate-y-1 transition-transform">Scopri di più</span>
            <ChevronDown className="h-6 w-6 animate-bounce group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Macro Categories Section - Full Height */}
      <div id="categories" className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="container mx-auto relative">
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '1000ms' }}>
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Esplora per Categoria
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
              {macroCategories.map((category, index) => (
                <MacroCategoryCard
                  key={category.id}
                  category={category}
                  frameworkCount={frameworks.filter(f => category.categories.includes(f.category)).length}
                  isVisible={isVisible}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

  

      {/* Individual Category Sections */}
      <div className="space-y-32 py-20 px-4">
        {macroCategories.map((category) => (
          <CategoryFrameworks
            key={category.id}
            category={category}
            frameworks={frameworks}
            isVisible={visibleCategories.has(`category-${category.id}`)}
          />
        ))}
      </div>

      {/* Guide Section - Aggiunta alla fine */}
      <div id="guide" className="py-20">
        <div className="container mx-auto px-4 relative">
          <div className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '2400ms' }}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                Guide Utili
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Impara a utilizzare al meglio i framework AI con le nostre guide pratiche
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 rounded-2xl overflow-hidden relative">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Guida Base</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Inizia con i concetti fondamentali del prompt engineering e impara a strutturare i tuoi primi prompt.
                </p>
                <Link 
                  href="/guida-base"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                >
                  Scopri di più →
                </Link>
              </div>

              <div className="p-6 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 rounded-2xl overflow-hidden relative">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Tecniche Avanzate</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Padroneggia le tecniche avanzate di prompt engineering per ottenere risultati superiori.
                </p>
                <Link 
                  href="/tecniche-avanzate"
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1"
                >
                  Approfondisci →
                </Link>
              </div>

              <div className="p-6 text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-2 rounded-2xl overflow-hidden relative">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Best Practices</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Scopri le best practices e i trucchi professionali usati dagli esperti del settore.
                </p>
                <Link 
                  href="/best-practices"
                  className="text-sm text-green-600 dark:text-green-400 hover:underline inline-flex items-center gap-1"
                >
                  Inizia ora →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className={`py-20 text-center transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`} style={{ transitionDelay: '2500ms' }}>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-full border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <p className="text-muted-foreground font-medium">
            Seleziona un framework per iniziare a testare le tue capacità di prompt engineering
          </p>
        </div>
      </div>

      <Footer />

      {/* CSS per animazioni personalizzate */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default function Home() {
  return <AnimatedContent />
}