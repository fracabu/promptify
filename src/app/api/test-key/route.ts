import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { provider, apiKey } = await request.json()

    if (!provider || !apiKey) {
      return NextResponse.json(
        { error: 'Provider e chiave API sono richiesti' },
        { status: 400 }
      )
    }

    let isValid = false
    let error = null

    switch (provider) {
      case 'openai':
        try {
          const response = await fetch('https://api.openai.com/v1/models', {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
          })
          isValid = response.ok
          if (!isValid) {
            const errorData = await response.json().catch(() => ({}))
            error = errorData.error?.message || 'Chiave OpenAI non valida'
          }
        } catch (err) {
          error = 'Errore di connessione con OpenAI'
        }
        break

      case 'gemini':
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`)
          isValid = response.ok
          if (!isValid) {
            const errorData = await response.json().catch(() => ({}))
            error = errorData.error?.message || 'Chiave Gemini non valida'
          }
        } catch (err) {
          error = 'Errore di connessione con Gemini'
        }
        break

      case 'zai':
        try {
          // Test con ZAI SDK - usa la chiave API personalizzata
          const response = await fetch('https://api.z-ai.dev/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [{ role: 'user', content: 'Test' }],
              max_tokens: 1
            })
          })
          isValid = response.ok
          if (!isValid) {
            const errorData = await response.json().catch(() => ({}))
            error = errorData.error?.message || 'Chiave ZAI non valida'
          }
        } catch (err) {
          error = 'Errore di connessione con ZAI'
        }
        break

      default:
        return NextResponse.json(
          { error: 'Provider non supportato' },
          { status: 400 }
        )
    }

    return NextResponse.json({
      isValid,
      error,
      provider
    })

  } catch (error) {
    console.error('Errore durante il test della chiave API:', error)
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    )
  }
}