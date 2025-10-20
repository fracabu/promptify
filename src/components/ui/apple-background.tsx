'use client'

import { useEffect, useState } from 'react'

export function AppleBackground() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-blue-950/20 dark:via-slate-900 dark:to-purple-950/20" />
      <div 
        className={`absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl ${
          isMounted ? 'animate-pulse' : ''
        }`} 
        style={isMounted ? { animationDelay: '0s' } : {}} 
      />
      <div 
        className={`absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl ${
          isMounted ? 'animate-pulse' : ''
        }`} 
        style={isMounted ? { animationDelay: '1s' } : {}} 
      />
      <div 
        className={`absolute top-1/2 left-1/2 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl ${
          isMounted ? 'animate-pulse' : ''
        }`} 
        style={isMounted ? { animationDelay: '2s' } : {}} 
      />
    </div>
  )
}