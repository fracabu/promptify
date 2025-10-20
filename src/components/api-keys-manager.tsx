'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Key, Trash2, Check, X, Shield, Settings, Loader2 } from 'lucide-react'
import { useApiKeysStore, ApiProvider } from '@/lib/store/api-keys'

const providerInfo = {
  gemini: {
    name: 'Google Gemini',
    description: 'Chiave API per Google Gemini AI',
    placeholder: 'AIza...',
    color: 'bg-blue-500',
    icon: '🤖'
  },
  openai: {
    name: 'OpenAI',
    description: 'Chiave API per OpenAI (GPT-4, GPT-3.5)',
    placeholder: 'sk-...',
    color: 'bg-green-500',
    icon: '🧠'
  },
  zai: {
    name: 'ZAI',
    description: 'Chiave API per ZAI Web Dev SDK',
    placeholder: 'zai-...',
    color: 'bg-purple-500',
    icon: '⚡'
  }
}

export function ApiKeysManager() {
  const { apiKeys, setApiKey, removeApiKey, hasValidKey } = useApiKeysStore()
  const [mounted, setMounted] = useState(false)
  
  const [showKeys, setShowKeys] = useState<Record<ApiProvider, boolean>>({
    gemini: false,
    openai: false,
    zai: false
  })
  const [tempKeys, setTempKeys] = useState<Record<ApiProvider, string>>({
    gemini: '',
    openai: '',
    zai: ''
  })
  const [testingKeys, setTestingKeys] = useState<Record<ApiProvider, boolean>>({
    gemini: false,
    openai: false,
    zai: false
  })
  const [testResults, setTestResults] = useState<Record<ApiProvider, { isValid: boolean; error?: string } | null>>({
    gemini: null,
    openai: null,
    zai: null
  })

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const testApiKey = async (provider: ApiProvider, key: string) => {
    setTestingKeys(prev => ({ ...prev, [provider]: true }))
    setTestResults(prev => ({ ...prev, [provider]: null }))

    try {
      const response = await fetch('/api/test-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider, apiKey: key }),
      })

      const result = await response.json()
      setTestResults(prev => ({ ...prev, [provider]: result }))
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [provider]: { isValid: false, error: 'Errore di connessione' }
      }))
    } finally {
      setTestingKeys(prev => ({ ...prev, [provider]: false }))
    }
  }

  const handleSaveKey = (provider: ApiProvider) => {
    const key = tempKeys[provider].trim()
    if (key) {
      setApiKey(provider, key)
      setTempKeys(prev => ({ ...prev, [provider]: '' }))
    }
  }

  const handleRemoveKey = (provider: ApiProvider) => {
    removeApiKey(provider)
    setShowKeys(prev => ({ ...prev, [provider]: false }))
  }

  const toggleKeyVisibility = (provider: ApiProvider) => {
    setShowKeys(prev => ({ ...prev, [provider]: !prev[provider] }))
  }

  const maskKey = (key: string) => {
    if (key.length <= 8) return key
    return key.substring(0, 4) + '...' + key.substring(key.length - 4)
  }

  if (!mounted) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Gestione Chiavi API
          </CardTitle>
          <CardDescription>
            Caricamento...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Gestione Chiavi API
        </CardTitle>
        <CardDescription>
          Inserisci le tue chiavi API personali per utilizzare i diversi provider AI.
          Le chiavi vengono salvate in modo sicuro nel tuo browser.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gemini" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {Object.entries(providerInfo).map(([key, info]) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                <span>{info.icon}</span>
                {info.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(providerInfo).map(([provider, info]) => {
            const providerKey = provider as ApiProvider
            const hasKey = hasValidKey(providerKey)
            const currentKey = apiKeys[providerKey]

            return (
              <TabsContent key={providerKey} value={providerKey} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`${providerKey}-key`} className="flex items-center gap-2">
                    <Key className="h-4 w-4" />
                    Chiave API {info.name}
                  </Label>
                  <p className="text-sm text-muted-foreground">{info.description}</p>
                </div>

                {hasKey ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <Badge variant="secondary" className={`${info.color} text-white`}>
                        {info.icon} {info.name}
                      </Badge>
                      <div className="flex-1 font-mono text-sm">
                        {showKeys[providerKey] ? currentKey : maskKey(currentKey)}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleKeyVisibility(providerKey)}
                      >
                        {showKeys[providerKey] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => testApiKey(providerKey, currentKey)}
                        disabled={testingKeys[providerKey]}
                      >
                        {testingKeys[providerKey] ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveKey(providerKey)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {testResults[providerKey] && (
                      <Alert variant={testResults[providerKey]?.isValid ? "default" : "destructive"}>
                        {testResults[providerKey]?.isValid ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <AlertDescription>
                          {testResults[providerKey]?.isValid 
                            ? `Chiave ${info.name} valida e funzionante!`
                            : testResults[providerKey]?.error || `Chiave ${info.name} non valida`
                          }
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {!testResults[providerKey] && (
                      <Alert>
                        <Check className="h-4 w-4" />
                        <AlertDescription>
                          Chiave {info.name} configurata. Clicca sull'icona di verifica per testare la connessione.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        id={`${providerKey}-key`}
                        type="password"
                        placeholder={info.placeholder}
                        value={tempKeys[providerKey]}
                        onChange={(e) => setTempKeys(prev => ({ ...prev, [providerKey]: e.target.value }))}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => testApiKey(providerKey, tempKeys[providerKey])}
                        disabled={!tempKeys[providerKey].trim() || testingKeys[providerKey]}
                        variant="outline"
                      >
                        {testingKeys[providerKey] ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          'Test'
                        )}
                      </Button>
                      <Button
                        onClick={() => handleSaveKey(providerKey)}
                        disabled={!tempKeys[providerKey].trim()}
                      >
                        Salva
                      </Button>
                    </div>
                    
                    {testResults[providerKey] && (
                      <Alert variant={testResults[providerKey]?.isValid ? "default" : "destructive"}>
                        {testResults[providerKey]?.isValid ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <AlertDescription>
                          {testResults[providerKey]?.isValid 
                            ? `Chiave ${info.name} valida! Puoi salvarla.`
                            : testResults[providerKey]?.error || `Chiave ${info.name} non valida`
                          }
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {!testResults[providerKey] && (
                      <Alert>
                        <X className="h-4 w-4" />
                        <AlertDescription>
                          Nessuna chiave {info.name} configurata. Inserisci una chiave e testa prima di salvarla.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                )}
              </TabsContent>
            )
          })}
        </Tabs>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Informazioni sulla sicurezza
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Le chiavi API vengono salvate solo nel tuo browser (localStorage)</li>
            <li>• Non vengono mai inviate ai nostri server</li>
            <li>• Vengono utilizzate solo per le chiamate API dirette</li>
            <li>• Puoi rimuoverle in qualsiasi momento</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}