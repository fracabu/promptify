'use client'

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookOpen, ArrowRight, CheckCircle, Lightbulb, Target } from "lucide-react"
import Link from "next/link"

export default function GuidaBase() {
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
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              Guida Base al Prompt Engineering
            </h1>
            <p className="text-xl text-muted-foreground">
              Inizia con i concetti fondamentali del prompt engineering e impara a strutturare i tuoi primi prompt
            </p>
          </div>

          {/* Contenuto della guida */}
          <div className="space-y-8">
            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                Cos'è un Prompt?
              </h2>
              <p className="text-muted-foreground mb-4">
                Un prompt è l'input che fornisci a un modello di intelligenza artificiale per ottenere una risposta o eseguire un compito. 
                La qualità del tuo prompt determina direttamente la qualità della risposta che riceverai.
              </p>
              <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded">
                <p className="text-sm">
                  <strong>Esempio:</strong> Invece di "Scrivi un'email", prova "Scrivi un'email professionale a un cliente 
                  per informarlo di un ritardo nella consegna, mantenendo un tono empatico e proponendo una soluzione"
                </p>
              </div>
            </section>

            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Target className="h-6 w-6 text-green-500" />
                Elementi di un Prompt Efficace
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Contesto Chiaro</h3>
                    <p className="text-sm text-muted-foreground">
                      Fornisci informazioni di background rilevanti
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Istruzioni Specifiche</h3>
                    <p className="text-sm text-muted-foreground">
                      Sii preciso su ciò che vuoi ottenere
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Formato Desiderato</h3>
                    <p className="text-sm text-muted-foreground">
                      Specifica come vuoi che sia strutturata la risposta
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Esempi</h3>
                    <p className="text-sm text-muted-foreground">
                      Fornisci esempi per guidare la risposta
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Framework Principali per Principianti</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold mb-2">Framework APE</h3>
                  <p className="text-muted-foreground mb-2">
                    <strong>Action</strong>: Azione che vuoi che l'AI compia<br/>
                    <strong>Purpose</strong>: Scopo dell'azione<br/>
                    <strong>Expectation</strong>: Risultato atteso
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold mb-2">Framework BAB</h3>
                  <p className="text-muted-foreground mb-2">
                    <strong>Before</strong>: Situazione attuale<br/>
                    <strong>After</strong>: Situazione desiderata<br/>
                    <strong>Bridge</strong>: Passaggi per arrivare lì
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Esercizi Pratici</h2>
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Esercizio 1: Migliora un Prompt</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Prompt base: "Scrivi un articolo sul fitness"
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Miglioralo usando gli elementi appresi: contesto, istruzioni specifiche, formato ed esempi.
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Esercizio 2: Applica un Framework</h3>
                  <p className="text-sm text-muted-foreground">
                    Scegli un task (es. creare una ricetta) e applicaci il framework APE o BAB.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <Link 
              href="/tecniche-avanzate"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Prossimo: Tecniche Avanzate
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}