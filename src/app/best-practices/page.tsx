'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Zap, ArrowRight, CheckCircle, AlertTriangle, Lightbulb, Award } from "lucide-react"
import Link from "next/link"

export default function BestPractices() {
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
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-6">
              <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              Best Practices del Prompt Engineering
            </h1>
            <p className="text-xl text-muted-foreground">
              Scopri le best practices e i trucchi professionali usati dagli esperti del settore
            </p>
          </div>

          {/* Contenuto della guida */}
          <div className="space-y-8">
            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Best Practices Fondamentali
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Sii Specifico</h3>
                      <p className="text-sm text-muted-foreground">
                        Evita ambiguità. Più dettagli fornisci, migliore sarà la risposta.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Usa un Linguaggio Semplice</h3>
                      <p className="text-sm text-muted-foreground">
                        Anche per argomenti complessi, usa frasi chiare e dirette.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Fornisci Contesto</h3>
                      <p className="text-sm text-muted-foreground">
                        L'AI non conosce il tuo background. Fornisci le informazioni necessarie.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Specifica il Formato</h3>
                      <p className="text-sm text-muted-foreground">
                        Indica come vuoi la risposta: lista, tabella, paragrafi, ecc.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Itera e Migliora</h3>
                      <p className="text-sm text-muted-foreground">
                        La prima risposta raramente è perfetta. Refina il prompt.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Testa e Confronta</h3>
                      <p className="text-sm text-muted-foreground">
                        Prova diverse varianti del prompt per trovare la migliore.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
                Errori Comuni da Evitare
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold mb-2">Prompt Troppo Vaghi</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Errato:</strong> "Scrivi qualcosa sul marketing"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Corretto:</strong> "Scrivi un articolo di 800 parole sulle 5 strategie di marketing digitale più efficaci per le PMI nel 2024"
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold mb-2">Domande a Cascata</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Evita domande che richiedono solo "sì" o "no". Chiedi spiegazioni e approfondimenti.
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold mb-2">Mancanza di Esempi</h3>
                  <p className="text-sm text-muted-foreground">
                    Per output complessi, fornisci sempre esempi del formato desiderato.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                Trucchi Professionali
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Temperature Control</h3>
                    <p className="text-sm text-muted-foreground">
                      Usa temperature basse (0.1-0.3) per risposte fattuali e temperature alte (0.7-0.9) per contenuti creativi.
                    </p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Prompt Chaining</h3>
                    <p className="text-sm text-muted-foreground">
                      Dividi task complessi in più prompt sequenziali, usando l'output di uno come input per il successivo.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Negative Prompts</h3>
                    <p className="text-sm text-muted-foreground">
                      Specifica cosa NON vuoi nella risposta: "Non includere riferimenti a..." o "Evita di usare...".
                    </p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Meta-Prompts</h3>
                    <p className="text-sm text-muted-foreground">
                      Chiedi all'AI di migliorare il tuo stesso prompt: "Come potrei migliorare questo prompt per ottenere risultati migliori?"
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Award className="h-6 w-6 text-purple-500" />
                Checklist per Prompt Perfetti
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 text-green-600 rounded" readOnly />
                  <label className="text-sm">Ho fornito contesto sufficiente?</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 text-green-600 rounded" readOnly />
                  <label className="text-sm">Le istruzioni sono specifiche e chiare?</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 text-green-600 rounded" readOnly />
                  <label className="text-sm">Ho specificato il formato desiderato?</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 text-green-600 rounded" readOnly />
                  <label className="text-sm">Ho fornito esempi rilevanti?</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 text-green-600 rounded" readOnly />
                  <label className="text-sm">Ho definito il tono e lo stile?</label>
                </div>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="h-4 w-4 text-green-600 rounded" readOnly />
                  <label className="text-sm">Ho specificato i limiti (lunghezza, contenuto da evitare)?</label>
                </div>
              </div>
            </section>

            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Progetto Finale</h2>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-6 rounded-lg">
                <h3 className="font-semibold mb-3">Sfida: Crea un Sistema di Prompt Completo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Sviluppa un set di 5 prompt interconnessi per automatizzare un processo lavorativo reale 
                  (es. content marketing, customer service, analisi dati). Ogni prompt deve utilizzare 
                  tecniche diverse e produrre output che alimentano il prompt successivo.
                </p>
                <div className="text-sm text-muted-foreground">
                  <strong>Criteri di valutazione:</strong> Completezza, coerenza, efficienza, qualità degli output.
                </div>
              </div>
            </section>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Torna ai Framework
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}