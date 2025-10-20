"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Brain, Sparkles, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchBar } from "@/components/search-bar"
import { cn } from "@/lib/utils"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Framework", href: "/" },
    { name: "Categorie", href: "#categories" },
    { name: "Guide", href: "#guide" },
    { name: "Impostazioni", href: "/impostazioni" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8">
            <img 
              src="/logo.png" 
              alt="Promptify" 
              className="h-8 w-8 rounded-lg object-cover"
            />
          </div>
          <span className="text-xl font-bold">
            <span className="text-foreground">Parl</span>
            <span className="text-blue-600 dark:text-blue-400">ia</span>
            <span className="text-foreground">moci</span>
            <span className="text-foreground">Ch</span>
            <span className="text-orange-600 dark:text-orange-400">ia</span>
            <span className="text-foreground">ro</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <SearchBar />
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hidden md:flex"
          >
            <Link href="/impostazioni">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Impostazioni</span>
            </Link>
          </Button>
          <ThemeToggle />
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden",
          isMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="border-t bg-background px-4 py-2">
          <div className="mb-4">
            <SearchBar />
          </div>
          <nav className="flex flex-col space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}