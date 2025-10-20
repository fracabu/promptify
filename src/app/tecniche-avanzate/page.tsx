'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Target, ArrowRight, Brain, Zap, Code, Star } from "lucide-react"
import Link from "next/link"

export default function TecnicheAvanzate() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
              ← Torna alla Home
            </Link>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Target className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              Tecniche Avanzate di Prompt Engineering
            </h1>
            <p className="text-xl text-muted-foreground">
              Padroneggia le tecniche avanzate per ottenere risultati superiori dall'AI
            </p>
          </div>

          {/* Contenuto della guida */}
          <div className="space-y-8">
            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Brain className="h-6 w-6 text-purple-500" />
                Chain of Thought (CoT)
              </h2>
              <p className="text-muted-foreground mb-4">
                Incoraggia l'AI a ragionare passo dopo passo, spiegando il suo processo di pensiero prima di dare la risposta finale.
              </p>
              <div className="bg-purple-50 dark:bg-purple-950/20 border-l-4 border-purple-500 p-4 rounded">
                <p className="text-sm mb-2">
                  <strong>Esempio:</strong> "Pensa passo dopo passo per risolvere questo problema..."
                </p>
                <p className="text-sm">
                  "Prima analizza il problema, poi considera le possibili soluzioni, infine scegli la migliore e spiega perché."
                </p>
              </div>
            </section>

            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Zap className="h-6 w-6 text-yellow-500" />
                Few-Shot Learning
              </h2>
              <p className="text-muted-foreground mb-4">
                Fornisci alcuni esempi completi di input-output per guidare l'AI verso il tipo di risposta desiderata.
              </p>
              <div className="space-y-3">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded">
                  <p className="text-sm font-mono mb-1">Esempio 1:</p>
                  <p className="text-sm">Input: "Sono stanco" → Output: "Capisco, riposati un po'"</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded">
                  <p className="text-sm font-mono mb-1">Esempio 2:</p>
                  <p className="text-sm">Input: "Ho fame" → Output: "Perché non fai uno spuntino?"</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded">
                  <p className="text-sm font-mono mb-1">Ora tu:</p>
                  <p className="text-sm">Input: "Sono felice" → Output: ?</p>
                </div>
              </div>
            </section>

            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Code className="h-6 w-6 text-blue-500" />
                Role Prompting
              </h2>
              <p className="text-muted-foreground mb-4">
                Assegna un ruolo specifico all'AI per influenzare il suo stile, tono e approccio alla risposta.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold mb-2">Esempi di Ruoli</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• "Agisci come un esperto di marketing"</li>
                    <li>• "Sei un insegnante paziente"</li>
                    <li>• "Pretendi di essere un consulente finanziario"</li>
                    <li>• "Assumi il ruolo di uno scrittore creativo"</li>
                  </ul>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded">
                  <p className="text-sm">
                    <strong>Tip:</strong> Combina più ruoli per risultati ancora più specifici: 
                    "Agisci come un nutrizionista esperto che comunica come se parlasse a un bambino di 10 anni"
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Star className="h-6 w-6 text-green-500" />
                Framework Avanzati
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold mb-2">Framework CRISPE</h3>
                  <p className="text-muted-foreground mb-2">
                    <strong>C</strong>ontext, <strong>R</strong>ole, <strong>I</strong>nstruction, 
                    <strong>S</strong>tep, <strong>P</strong>ersona, <strong>E</strong>xample
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Framework completo per prompt dettagliati e strutturati
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-semibold mb-2">Framework SPAR</h3>
                  <p className="text-muted-foreground mb-2">
                    <strong>S</strong>ituation, <strong>P</strong>roblem, <strong>A</strong>ction, <strong>R</strong>esult
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ideale per la risoluzione di problemi complessi
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Esercizi Avanzati</h2>
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Esercizio 1: Chain of Thought</h3>
                  <p className="text-sm text-muted-foreground">
                    Chiedi all'AI di risolvere un problema logico complesso, obbligandola a mostrare ogni passaggio del ragionamento.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Esercizio 2: Role Switching</h3>
                  <p className="text-sm text-muted-foreground">
                    Crea lo stesso prompt ma con ruoli diversi (es. scienziato vs poeta) e confronta i risultati.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Esercizio 3: Few-Shot Complex</h3>
                  <p className="text-sm text-muted-foreground">
                    Insegna all'AI un formato di output complesso usando 3-5 esempi dettagliati.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Link 
              href="/best-practices"
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Prossimo: Best Practices
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}