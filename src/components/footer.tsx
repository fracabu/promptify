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
            <div className="relative h-8 w-8 flex items-center justify-center bg-purple-600 rounded-lg">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V9h7V2.99c3.72 1.15 6.47 4.82 7 8.94v.06h-7z"/>
              </svg>
            </div>
            <span className="text-xl font-bold">
              <span className="text-foreground">Prompt</span>
              <span className="text-purple-600 dark:text-purple-400">ify</span>
            </span>
          </Link>
          
          <p className="text-sm text-muted-foreground text-center max-w-md">
            La piattaforma professionale per scoprire e testare i framework AI più efficaci
          </p>
          
          {/* Bottom bar */}
          <div className="w-full pt-4 border-t">
            <p className="text-sm text-muted-foreground text-center flex items-center justify-center">
              © {currentYear} Promptify. Creato con <Heart className="h-4 w-4 mx-1 text-red-500" /> per la community AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}