import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ApiProvider = 'gemini' | 'openai' | 'zai'

interface ApiKey {
  provider: ApiProvider
  key: string
  isValid?: boolean
}

interface ApiKeysState {
  apiKeys: Record<ApiProvider, string>
  setApiKey: (provider: ApiProvider, key: string) => void
  removeApiKey: (provider: ApiProvider) => void
  getApiKey: (provider: ApiProvider) => string
  hasValidKey: (provider: ApiProvider) => boolean
  clearAllKeys: () => void
}

export const useApiKeysStore = create<ApiKeysState>()(
  persist(
    (set, get) => ({
      apiKeys: {
        gemini: '',
        openai: '',
        zai: ''
      },

      setApiKey: (provider: ApiProvider, key: string) => {
        set((state) => ({
          apiKeys: {
            ...state.apiKeys,
            [provider]: key
          }
        }))
      },

      removeApiKey: (provider: ApiProvider) => {
        set((state) => ({
          apiKeys: {
            ...state.apiKeys,
            [provider]: ''
          }
        }))
      },

      getApiKey: (provider: ApiProvider) => {
        return get().apiKeys[provider] || ''
      },

      hasValidKey: (provider: ApiProvider) => {
        const key = get().apiKeys[provider] || ''
        return key.length > 0
      },

      clearAllKeys: () => {
        set({
          apiKeys: {
            gemini: '',
            openai: '',
            zai: ''
          }
        })
      }
    }),
    {
      name: 'api-keys-storage'
    }
  )
)