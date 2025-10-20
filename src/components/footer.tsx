import Link from "next/link"
import { Brain, Heart } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Brand */}
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
          
          <p className="text-sm text-muted-foreground text-center max-w-md">
            La piattaforma professionale per scoprire e testare i framework AI più efficaci
          </p>
          
          {/* Bottom bar */}
          <div className="w-full pt-4 border-t">
            <p className="text-sm text-muted-foreground text-center flex items-center justify-center">
              © {currentYear} ParliamociChiaro. Creato con <Heart className="h-4 w-4 mx-1 text-red-500" /> per la community AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}