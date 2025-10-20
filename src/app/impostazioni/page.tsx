'use client'

import { ApiKeysManager } from '@/components/api-keys-manager'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function ImpostazioniPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Impostazioni</h1>
            <p className="text-muted-foreground">
              Gestisci le tue chiavi API e le preferenze del progetto
            </p>
          </div>

          <ApiKeysManager />
        </div>
      </main>

      <Footer />
    </div>
  )
}