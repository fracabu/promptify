import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

const frameworkTemplates: Record<string, string> = {
  "ape": "Action: [Azione da compiere]\nPurpose: [Scopo dell'azione]\nExpectation: [Risultato atteso]\n\nCompito: {input}",
  "aida": "Attention: [Cattura l'attenzione]\nInterest: [Genera interesse]\nDesire: [Crea desiderio]\nAction: [Chiama all'azione]\n\nArgomento: {input}",
  "bab": "Before: [Situazione attuale]\nAfter: [Situazione desiderata]\nBridge: [Soluzione che collega le due]\n\nProblema: {input}",
  "care": "Context: [Contesto della richiesta]\nAction: [Azione richiesta]\nResult: [Risultato atteso]\nExample: [Esempio pratico]\n\nRichiesta: {input}",
  "coast": "Context: [Contesto]\nObjective: [Obiettivo]\nAudience: [Pubblico target]\nStyle: [Stile del contenuto]\nTone: [Tono di comunicazione]\n\nCompito: {input}",
  "costar": "Context: [Contesto completo]\nObjective: [Obiettivo chiaro]\nStyle: [Stile richiesto]\nTone: [Tono appropriato]\nAudience: [Pubblico specifico]\nResponse: [Formato risposta]\n\nCompito: {input}",
  "craft": "Context: [Contesto]\nRole: [Ruolo da assumere]\nAction: [Azione specifica]\nFormat: [Formato output]\nTarget: [Target/Tone/Steps]\n\nCompito: {input}",
  "crispe": "Capacity: [Capacità/Ruolo]\nInsight: [Visione unica]\nStatement: [Dichiarazione chiara]\nPersonality: [Personalità]\nExperiment: [Approccio sperimentale]\n\nCompito: {input}",
  "chain-of-thought": "Risolvi questo problema passo dopo passo, spiegando ogni ragionamento:\n\n{input}\n\nPensa ad alta voce e mostra tutti i passaggi intermedi:",
  "crafting-ai": "Context: [Contesto]\nRole: [Ruolo]\nAction: [Azione]\nFormat: [Formato]\nTarget: [Obiettivo]\nING: [Validazione]\nAI: [Raffinamento continuo]\n\nCompito: {input}",
  "few-shot": "Ecco alcuni esempi per guidarti:\n\nEsempio 1: Testo positivo -> Sentiment: Positivo\nEsempio 2: Testo negativo -> Sentiment: Negativo\nEsempio 3: Testo neutro -> Sentiment: Neutro\n\nOra applica lo stesso approccio a:\n{input}",
  "grade": "Goal: [Obiettivo finale]\nRequest: [Richiesta specifica]\nAction: [Azione richiesta]\nDetails: [Dettagli importanti]\nExample: [Esempio pratico]\n\nCompito: {input}",
  "par": "Problem: [Problema da risolvere]\nAction: [Azione proposta]\nResult: [Risultato desiderato]\n\nSituazione: {input}",
  "race": "Role: [Ruolo professionale]\nAction: [Azione specifica]\nContext: [Contesto dettagliato]\nExpectations: [Aspettative chiare]\n\nCompito: {input}",
  "rascef": "Role: [Ruolo]\nAction: [Azione]\nSteps: [Passaggi dettagliati]\nContext: [Contesto]\nExamples: [Esempi pratici]\nFormat: [Formato output]\n\nCompito: {input}",
  "rhodes": "Role: [Ruolo specifico]\nObjective: [Obiettivo]\nDetails: [Dettagli stile/tone]\nExamples: [Esempi stile]\nSense Check: [Validazione coerenza]\n\nCompito: {input}",
  "roses": "Role: [Ruolo creativo]\nObjective: [Obiettivo creativo]\nStyle: [Stile richiesto]\nExample: [Esempio stile]\nScenario: [Scenario descrittivo]\n\nCompito: {input}",
  "rtf": "Role: [Ruolo]\nTask: [Compito specifico]\nFinish: [Stato completamento]\n\nCompito: {input}",
  "smart": "Specific: [Specifico]\nMeasurable: [Misurabile]\nAchievable: [Raggiungibile]\nRelevant: [Rilevante]\nTime-bound: [Con scadenza]\n\nObiettivo: {input}",
  "sparc": "System: [Multi-agent setup]\nTemplate: [Structured template]\nCognitive: [Operations]\nAgents: [Specialization]\nRecursive: [Task delegation]\nContext: [Management]\nMemory: [Systems]\n\nCompito: {input}",
  "spear": "Start: [Inizio diretto]\nProvide: [Informazioni necessarie]\nExplain: [Spiegazione contesto]\nAsk: [Domanda chiara]\n\nCompito: {input}",
  "star": "Situation: [Contesto situazione]\nTask: [Compito specifico]\nAction: [Azioni intraprese]\nResult: [Risultati ottenuti]\n\nScenario: {input}",
  "tag": "Task: [Compito]\nAction: [Azione]\nGoal: [Obiettivo finale]\n\nRichiesta: {input}",
  "trace": "Task: [Compito specifico]\nRequirements: [Requisiti]\nAudience: [Pubblico]\nContext: [Contesto]\nEvaluation: [Criteri valutazione]\n\nCompito: {input}",
  "tree-of-thoughts": "Esplora almeno 3 approcci diversi per risolvere questo problema:\n\n{input}\n\nPer ogni approccio:\n1. Descrivi la strategia\n2. Elenca vantaggi e svantaggi\n3. Valuta l'efficacia (1-10)\n\nInfine, indica la soluzione migliore e perché.",
  "traci": "Task: [Compito]\nRole: [Ruolo]\nAudience: [Pubblico target]\nCreate: [Output richiesto]\nIntent: [Intento comunicativo]\n\nCompito: {input}",
  "zero-shot": "{input}\n\nIstruzioni: Rispondi direttamente alla richiesta basandoti sulle tue conoscenze. Sii chiaro, conciso e preciso."
}

async function callZAIWithRetry(prompt: string, framework: string, maxRetries: number = 3): Promise<string> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries} for framework ${framework}`)
      
      const zai = await ZAI.create()
      
      const completion = await zai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `Sei un assistente AI specializzato nell'applicare il framework ${framework}. Rispondi sempre applicando correttamente questo framework e fornendo risposte dettagliate e utili.`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })

      const result = completion.choices[0]?.message?.content
      if (!result) {
        throw new Error('Nessuna risposta generata dal modello')
      }

      return result
    } catch (error: any) {
      console.error(`Attempt ${attempt} failed:`, error.message)
      
      if (attempt === maxRetries) {
        throw error
      }
      
      // Wait before retry with exponential backoff
      await new Promise(resolve => setTimeout(resolve, 2000 * attempt))
    }
  }
  
  throw new Error('Max retries exceeded')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { framework, input, template, provider, apiKey } = body

    if (!framework || !input) {
      return NextResponse.json(
        { success: false, error: 'Framework e input sono obbligatori' },
        { status: 400 }
      )
    }

    // Usa il template fornito o quello predefinito
    const selectedTemplate = template || frameworkTemplates[framework] || "{input}"
    
    // Sostituisci il placeholder {input} con l'input dell'utente
    const prompt = selectedTemplate.replace('{input}', input)

    let result: string

    // Usa la chiave API personale se fornita, altrimenti usa il metodo di default
    if (provider && apiKey) {
      try {
        result = await callWithPersonalKey(prompt, framework, provider, apiKey)
      } catch (error: any) {
        console.error(`Primary provider ${provider} failed:`, error.message)
        
        // Fallback automatico se il provider primario fallisce
        if (provider === 'gemini' && (error.message.includes('location') || error.message.includes('not found'))) {
          console.log('Gemini not available, falling back to ZAI...')
          result = await callZAIWithRetry(prompt, framework)
        } else if (provider === 'openai' && (error.message.includes('invalid') || error.message.includes('quota'))) {
          console.log('OpenAI API issue, falling back to ZAI...')
          result = await callZAIWithRetry(prompt, framework)
        } else if (provider === 'zai' && error.message.includes('invalid')) {
          console.log('ZAI API issue, falling back to default ZAI...')
          result = await callZAIWithRetry(prompt, framework)
        } else {
          throw error
        }
      }
    } else {
      result = await callZAIWithRetry(prompt, framework)
    }

    return NextResponse.json({
      success: true,
      result: result,
      framework: framework,
      prompt: prompt
    })

  } catch (error: any) {
    console.error('Errore nel test del framework:', error)
    
    let errorMessage = 'Errore durante l\'elaborazione della richiesta'
    
    if (error.message) {
      if (error.message.includes('timeout')) {
        errorMessage = 'Timeout del server AI. Riprova tra qualche minuto.'
      } else if (error.message.includes('connection')) {
        errorMessage = 'Errore di connessione al servizio AI. Riprova più tardi.'
      } else if (error.message.includes('rate limit')) {
        errorMessage = 'Troppe richieste. Attendi qualche secondo prima di riprovare.'
      } else {
        errorMessage = error.message
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage
      },
      { status: 500 }
    )
  }
}

async function callWithPersonalKey(prompt: string, framework: string, provider: string, apiKey: string): Promise<string> {
  try {
    switch (provider) {
      case 'openai':
        return await callOpenAI(prompt, framework, apiKey)
      case 'gemini':
        return await callGemini(prompt, framework, apiKey)
      case 'zai':
        return await callZAI(prompt, framework, apiKey)
      default:
        throw new Error(`Provider ${provider} non supportato`)
    }
  } catch (error: any) {
    console.error(`Error calling ${provider}:`, error)
    throw new Error(`Errore con ${provider}: ${error.message}`)
  }
}

async function callOpenAI(prompt: string, framework: string, apiKey: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-2025-04-14',
      messages: [
        {
          role: 'system',
          content: `Sei un assistente AI specializzato nell'applicare il framework ${framework}. Rispondi sempre applicando correttamente questo framework e fornendo risposte dettagliate e utili.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error?.message || 'Errore chiamata OpenAI')
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || 'Nessuna risposta generata'
}

async function callGemini(prompt: string, framework: string, apiKey: string): Promise<string> {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Sei un assistente AI specializzato nell'applicare il framework ${framework}. Rispondi sempre applicando correttamente questo framework e fornendo risposte dettagliate e utili.\n\n${prompt}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    })
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error?.message || 'Errore chiamata Gemini')
  }

  const data = await response.json()
  return data.candidates[0]?.content?.parts[0]?.text || 'Nessuna risposta generata'
}

async function callZAI(prompt: string, framework: string, apiKey: string): Promise<string> {
  const response = await fetch('https://api.z-ai.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4.1-2025-04-14',
      messages: [
        {
          role: 'system',
          content: `Sei un assistente AI specializzato nell'applicare il framework ${framework}. Rispondi sempre applicando correttamente questo framework e fornendo risposte dettagliate e utili.`
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.error?.message || 'Errore chiamata ZAI')
  }

  const data = await response.json()
  return data.choices[0]?.message?.content || 'Nessuna risposta generata'
}