'use client'

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Play, Copy, Check, Brain, Target, Zap, MessageSquare, Lightbulb, Rocket, Settings, ArrowRight, Users, TrendingUp, FileText, Award, Compass, CheckCircle, Star, Layers, Eye, GitBranch, Clock, Crosshair, Sparkles, PenTool, BarChart3, UserCheck, Flag, Search, Map, Anchor, ZapOff, Key } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useApiKeysStore, ApiProvider } from "@/lib/store/api-keys"

const frameworksData = {
  "ape": {
    title: "APE",
    description: "Struttura in tre passaggi (Action, Purpose, Expectation) ideale per principianti e content creation",
    icon: Target,
    color: "bg-emerald-500",
    category: "Struttura",
    difficulty: "Facile",
    explanation: "APE è un framework semplice ma efficace che struttura i prompt in tre componenti chiave: l'azione da compiere, lo scopo dell'azione, e il risultato atteso. È particolarmente utile per chi è agli inizi con il prompt engineering.",
    example: "Action: Scrivi un'email\nPurpose: Per informare i clienti di una nuova promozione\nExpectation: L'email dovrebbe essere convincente e portare a clic sul link\n\nCompito: {input}",
    template: "Action: [Azione da compiere]\nPurpose: [Scopo dell'azione]\nExpectation: [Risultato atteso]\n\nCompito: {input}"
  },
  "aida": {
    title: "AIDA",
    description: "Formula di marketing (Attention, Interest, Desire, Action) adattata per prompt engineering",
    icon: TrendingUp,
    color: "bg-pink-500",
    category: "Marketing",
    difficulty: "Medio",
    explanation: "AIDA è una formula di marketing classica adattata per il prompt engineering. Cattura l'attenzione, genera interesse, crea desiderio e spinge all'azione. È ideale per contenuti persuasivi e di marketing.",
    example: "Attention: 🚨 Offerta limitata!\nInterest: Scopri come risparmiare il 50% sui tuoi acquisti\nDesire: Immagina di avere tutto quello che desideri a metà prezzo\nAction: Clicca subito e approfitta dell'offerta\n\nProdotto: {input}",
    template: "Attention: [Cattura l'attenzione]\nInterest: [Genera interesse]\nDesire: [Crea desiderio]\nAction: [Chiama all'azione]\n\nArgomento: {input}"
  },
  "bab": {
    title: "BAB",
    description: "Struttura Before-After-Bridge per presentare scenari e soluzioni connesse",
    icon: GitBranch,
    color: "bg-teal-500",
    category: "Struttura",
    difficulty: "Facile",
    explanation: "BAB presenta una situazione 'Before' (prima), una situazione 'After' (dopo) e un 'Bridge' (ponte) che collega le due. È efficace per mostrare trasformazioni e soluzioni ai problemi.",
    example: "Before: Fatico a organizzare il mio tempo\nAfter: Sono produttivo e rilassato\nBridge: Con questa tecnica di gestione del tempo\n\nProblema: {input}",
    template: "Before: [Situazione attuale]\nAfter: [Situazione desiderata]\nBridge: [Soluzione che collega le due]\n\nProblema: {input}"
  },
  "care": {
    title: "CARE",
    description: "Context, Action, Result, Example per fornire contesto ed esempi chiari",
    icon: Users,
    color: "bg-rose-500",
    category: "Contesto",
    difficulty: "Medio",
    explanation: "CARE fornisce un contesto chiaro, specifica l'azione richiesta, definisce il risultato atteso e offre esempi. Questo framework è particolarmente utile per compiti che richiedono precisione e chiarezza.",
    example: "Context: Sei un consulente finanziario\nAction: Analizza questo portafoglio investimenti\nResult: Fornisci raccomandazioni specifiche\nExample: Per un portafoglio equilibrato, suggerisci 60% azioni, 40% bond\n\nRichiesta: {input}",
    template: "Context: [Contesto della richiesta]\nAction: [Azione richiesta]\nResult: [Risultato atteso]\nExample: [Esempio pratico]\n\nRichiesta: {input}"
  },
  "coast": {
    title: "COAST",
    description: "Context, Objective, Audience, Style, Tone per lavoro business e creativo",
    icon: Compass,
    color: "bg-blue-600",
    category: "Business",
    difficulty: "Medio",
    explanation: "COAST è un framework completo che considera il contesto, l'obiettivo, il pubblico, lo stile e il tono. È ideale per contenuti business e creativi che richiedono una comunicazione mirata.",
    example: "Context: Lancio nuovo prodotto\nObjective: Generare lead qualificati\nAudience: Imprenditori tech\nStyle: Professionale ma innovativo\nTone: Entusiasta e competente\n\nContenuto: {input}",
    template: "Context: [Contesto]\nObjective: [Obiettivo]\nAudience: [Pubblico target]\nStyle: [Stile del contenuto]\nTone: [Tono di comunicazione]\n\nCompito: {input}"
  },
  "costar": {
    title: "COSTAR",
    description: "Framework completo per prompt writing come sfida di design full-stack",
    icon: Star,
    color: "bg-amber-500",
    category: "Business",
    difficulty: "Avanzato",
    explanation: "COSTAR tratta il prompt writing come una sfida di design full-stack, considerando contesto, obiettivo, stile, tono, pubblico e risposta. È il framework più completo per prompt professionali.",
    example: "Context: Report trimestrale aziendale\nObjective: Comunicare risultati finanziari\nStyle: Formale e dati-driven\nTone: Professionale e trasparente\nAudience: Investitori e board\nResponse: Report strutturato con grafici\n\nRichiesta: {input}",
    template: "Context: [Contesto completo]\nObjective: [Obiettivo chiaro]\nStyle: [Stile richiesto]\nTone: [Tono appropriato]\nAudience: [Pubblico specifico]\nResponse: [Formato risposta]\n\nCompito: {input}"
  },
  "craft": {
    title: "CRAFT",
    description: "Metodologia strutturata e adattabile per prompt ben definiti e personalizzati",
    icon: PenTool,
    color: "bg-purple-600",
    category: "Struttura",
    difficulty: "Medio",
    explanation: "CRAFT è una metodologia strutturata che garantisce chiarezza, rilevanza e personalizzazione. Il componente 'T' può variare (Target Audience, Tone, Steps, etc.) rendendolo molto flessibile.",
    example: "Context: Sviluppo software\nRole: Senior developer\nAction: Code review\nFormat: Feedback strutturato\nTarget: Migliorare qualità codice\n\nProgetto: {input}",
    template: "Context: [Contesto]\nRole: [Ruolo da assumere]\nAction: [Azione specifica]\nFormat: [Formato output]\nTarget: [Target/Tone/Steps]\n\nCompito: {input}"
  },
  "crispe": {
    title: "CRISPE",
    description: "Capacity/Role, Insight, Statement, Personality, Experiment per definire ruolo e personalità",
    icon: Eye,
    color: "bg-cyan-600",
    category: "Personificazione",
    difficulty: "Medio",
    explanation: "CRISPE si concentra sulla definizione del ruolo del modello, fornendo insight, dichiarazioni chiare, assegnando personalità e permettendo sperimentazione. È ideale per risposte personalizzate.",
    example: "Capacity: Esperto di marketing digitale\nInsight: Il content marketing è il futuro\nStatement: Creeremo una strategia vincente\nPersonality: Creativo e analitico\nExperiment: Testiamo 3 approcci diversi\n\nProgetto: {input}",
    template: "Capacity: [Capacità/Ruolo]\nInsight: [Visione unica]\nStatement: [Dichiarazione chiara]\nPersonality: [Personalità]\nExperiment: [Approccio sperimentale]\n\nCompito: {input}"
  },
  "chain-of-thought": {
    title: "Chain of Thought",
    description: "Guida il modello a ragionare passo dopo passo per arrivare a una soluzione",
    icon: Brain,
    color: "bg-blue-500",
    category: "Ragionamento",
    difficulty: "Medio",
    explanation: "Il framework Chain of Thought (CoT) incoraggia il modello a esplicitare il proprio processo di ragionamento, dividendolo in passaggi logici. Questo approccio è particolarmente utile per problemi complessi che richiedono calcoli multipli o ragionamenti articolati.",
    example: "Risolvi questo problema passo dopo passo:\n\nProblema: Un negozio vende 20 prodotti al giorno. Ogni prodotto costa 15€. Se il negozio è aperto 6 giorni alla settimana, quanto incide in un mese?\n\nPensa ad alta voce:\n1. Prima calcola l'incasso giornaliero\n2. Poi calcola l'incasso settimanale\n3. Infine calcola l'incasso mensile\n4. Mostra tutti i passaggi intermedi",
    template: "Risolvi questo problema passo dopo passo, spiegando ogni ragionamento:\n\n{input}\n\nPensa ad alta voce e mostra tutti i passaggi intermedi:"
  },
  "crafting-ai": {
    title: "CRAFTING AI",
    description: "Estensione di CRAFT con fasi di validazione e raffinamento continuo",
    icon: Sparkles,
    color: "bg-violet-500",
    category: "Struttura",
    difficulty: "Avanzato",
    explanation: "CRAFTING AI estende CRAFT con fasi aggiuntive di validazione ('ING') e approccio interattivo ('AI'), garantendo un raffinamento continuo e una valutazione costante dei risultati.",
    example: "Context: Sviluppo app mobile\nRole: Product manager\nAction: Piano di lancio\nFormat: Roadmap dettagliata\nTarget: Successo mercato\nING: Validazione continua\nAI: Approccio iterativo\n\nProdotto: {input}",
    template: "Context: [Contesto]\nRole: [Ruolo]\nAction: [Azione]\nFormat: [Formato]\nTarget: [Obiettivo]\nING: [Validazione]\nAI: [Raffinamento continuo]\n\nCompito: {input}"
  },
  "few-shot": {
    title: "Few Shot Learning",
    description: "Fornisce esempi specifici per aiutare il modello a capire il compito richiesto",
    icon: Target,
    color: "bg-green-500",
    category: "Apprendimento",
    difficulty: "Facile",
    explanation: "Il Few Shot Learning fornisce al modello alcuni esempi del compito desiderato prima di presentare il problema reale. Questo aiuta il modello a capire il formato, lo stile e il tipo di risposta attesa.",
    example: "Esempi di classificazione del sentiment:\n\nEsempio 1:\nTesto: 'Questo prodotto è fantastico!'\nSentiment: Positivo\n\nEsempio 2:\nTesto: 'Il servizio è stato pessimo'\nSentiment: Negativo\n\nEsempio 3:\nTesto: 'Il film era nella media'\nSentiment: Neutro\n\nOra classifica questo testo:\nTesto: 'La consegna è stata veloce e il prodotto corrisponde alla descrizione'\nSentiment:",
    template: "Ecco alcuni esempi per guidarti:\n\n{examples}\n\nOra applica lo stesso approccio a:\n{input}"
  },
  "grade": {
    title: "GRADE",
    description: "Goal, Request, Action, Details, Example per prompt orientati agli obiettivi",
    icon: Award,
    color: "bg-indigo-500",
    category: "Obiettivi",
    difficulty: "Medio",
    explanation: "GRADE fornisce un approccio strutturato per prompt orientati agli obiettivi, definendo chiaramente il goal, la richiesta, l'azione, i dettagli e fornendo esempi pratici.",
    example: "Goal: Aumentare engagement social\nRequest: Crea contenuti virali\nAction: Sviluppa 5 post\nDetails: Instagram, target 18-30, tone divertente\nExample: 'Ecco 3 modi per...'\n\nCampagna: {input}",
    template: "Goal: [Obiettivo finale]\nRequest: [Richiesta specifica]\nAction: [Azione richiesta]\nDetails: [Dettagli importanti]\nExample: [Esempio pratico]\n\nCompito: {input}"
  },
  "par": {
    title: "PAR",
    description: "Problem, Action, Result per definire problemi e risultati desiderati",
    icon: CheckCircle,
    color: "bg-lime-500",
    category: "Problem Solving",
    difficulty: "Facile",
    explanation: "PAR è un framework semplice ma potente che definisce chiaramente il problema, l'azione da intraprendere e il risultato desiderato. È ideale per la risoluzione di problemi in modo strutturato.",
    example: "Problem: Basso tasso di conversione\nAction: Ottimizza landing page\nResult: Aumenta conversioni del 25%\n\nSituazione: {input}",
    template: "Problem: [Problema da risolvere]\nAction: [Azione proposta]\nResult: [Risultato desiderato]\n\nSituazione: {input}"
  },
  "race": {
    title: "RACE",
    description: "Role, Action, Context, Expectations per task professionali con expertise",
    icon: Flag,
    color: "bg-orange-600",
    category: "Professionale",
    difficulty: "Medio",
    explanation: "RACE è perfetto per task professionali che richiedono domain expertise. Definisce il ruolo, l'azione, il contesto e le aspettative per garantire risultati professionali e mirati.",
    example: "Role: Consulente finanziario senior\nAction: Analizza portafoglio clienti\nContext: Mercato volatile, Q4 2024\nExpectations: Raccomandazioni precise, rischio moderato\n\nAnalisi: {input}",
    template: "Role: [Ruolo professionale]\nAction: [Azione specifica]\nContext: [Contesto dettagliato]\nExpectations: [Aspettative chiare]\n\nCompito: {input}"
  },
  "rascef": {
    title: "RASCEF",
    description: "Role, Action, Steps, Context, Examples, Format per documentazione tecnica dettagliata",
    icon: FileText,
    color: "bg-slate-600",
    category: "Documentazione",
    difficulty: "Avanzato",
    explanation: "RASCEF è il framework ideale per documentazione tecnica e report analitici complessi. Fornisce tutti gli elementi necessari per creare contenuti dettagliati e ben strutturati.",
    example: "Role: Technical writer\nAction: Crea documentazione API\nSteps: 1. Overview 2. Endpoints 3. Esempi 4. Errori\nContext: REST API v2.0\nExamples: curl, Python, JavaScript\nFormat: Markdown con code blocks\n\nProgetto: {input}",
    template: "Role: [Ruolo]\nAction: [Azione]\nSteps: [Passaggi dettagliati]\nContext: [Contesto]\nExamples: [Esempi pratici]\nFormat: [Formato output]\n\nCompito: {input}"
  },
  "rhodes": {
    title: "RHODES",
    description: "Role, Objective, Details, Examples, Sense Check per output personalizzati con stile",
    icon: UserCheck,
    color: "bg-fuchsia-500",
    category: "Stile",
    difficulty: "Avanzato",
    explanation: "RHODES offre un approccio sfumato per output altamente personalizzati, particolarmente importante quando tono e stile sono critici. Include un 'Sense Check' per validare la coerenza.",
    example: "Role: Copywriter luxury brand\nObjective: Creare campagna esclusiva\nDetails: Target HNWI, tone sofisticato\nExamples: 'Eleganza senza tempo'\nSense Check: Verifica coerenza brand\n\nCampagna: {input}",
    template: "Role: [Ruolo specifico]\nObjective: [Obiettivo]\nDetails: [Dettagli stile/tone]\nExamples: [Esempi stile]\nSense Check: [Validazione coerenza]\n\nCompito: {input}"
  },
  "roses": {
    title: "ROSES",
    description: "Role, Objective, Style, Example, Scenario per contenuti creativi e marketing",
    icon: Layers,
    color: "bg-pink-600",
    category: "Creativo",
    difficulty: "Medio",
    explanation: "ROSES è ideale per contenuti creativi e marketing dove requisiti stilistici o tematici sono importanti. Combina ruolo, obiettivo, stile, esempi e scenario per risultati creativi mirati.",
    example: "Role: Creative director\nObjective: Campagna natalizia\nStyle: Magico e sentimentale\nExample: 'La magia del Natale in ogni casa'\nScenario: Famiglia riunita, regali, tradizioni\n\nProgetto: {input}",
    template: "Role: [Ruolo creativo]\nObjective: [Obiettivo creativo]\nStyle: [Stile richiesto]\nExample: [Esempio stile]\nScenario: [Scenario descrittivo]\n\nCompito: {input}"
  },
  "rtf": {
    title: "RTF",
    description: "Role, Task, Finish framework semplice per definire ruolo e stato di completamento",
    icon: Clock,
    color: "bg-stone-500",
    category: "Semplice",
    difficulty: "Facile",
    explanation: "RTF è un framework semplice che enfatizza la definizione del ruolo, il task specifico e lo stato di completamento desiderato. È perfetto per richieste dirette e non complesse.",
    example: "Role: Assistente virtuale\nTask: Prenota appuntamento\nFinish: Conferma inviata via email\n\nRichiesta: {input}",
    template: "Role: [Ruolo]\nTask: [Compito specifico]\nFinish: [Stato completamento]\n\nCompito: {input}"
  },
  "smart": {
    title: "SMART",
    description: "Specific, Measurable, Achievable, Relevant, Time-bound per obiettivi chiari",
    icon: Crosshair,
    color: "bg-green-600",
    category: "Obiettivi",
    difficulty: "Medio",
    explanation: "SMART adatta il famoso framework di goal setting per assicurare che gli obiettivi dei prompt siano chiari, misurabili, raggiungibili, rilevanti e con scadenze definite.",
    example: "Specific: Aumentare followers Instagram\nMeasurable: +1000 follower\nAchievable: Con content strategy\nRelevant: Per brand awareness\nTime-bound: Entro 3 mesi\n\nObiettivo: {input}",
    template: "Specific: [Specifico]\nMeasurable: [Misurabile]\nAchievable: [Raggiungibile]\nRelevant: [Rilevante]\nTime-bound: [Con scadenza]\n\nObiettivo: {input}"
  },
  "sparc": {
    title: "SPARC System",
    description: "Framework multi-agente con template strutturati e operazioni cognitive",
    icon: ZapOff,
    color: "bg-red-600",
    category: "Sistema",
    difficulty: "Avanzato",
    explanation: "SPARC è un sistema multi-agente che enfatizza template strutturati, operazioni cognitive, specializzazione agenti, delegazione ricorsiva, gestione contesto e sistemi di memoria.",
    example: "Agent 1: Research specialist\nAgent 2: Content creator\nAgent 3: Quality reviewer\nTemplate: Structured brief\nCognitive: Analysis + synthesis\nMemory: Knowledge base integration\n\nProgetto: {input}",
    template: "System: [Multi-agent setup]\nTemplate: [Structured template]\nCognitive: [Operations]\nAgents: [Specialization]\nRecursive: [Task delegation]\nContext: [Management]\nMemory: [Systems]\n\nCompito: {input}"
  },
  "spear": {
    title: "SPEAR",
    description: "Start, Provide, Explain, Ask, Rinse & Repeat per richieste concise ed efficienti",
    icon: Search,
    color: "bg-sky-500",
    category: "Efficienza",
    difficulty: "Facile",
    explanation: "SPEAR è un framework diretto sviluppato da Britney Muller che enfatizza chiarezza ed efficienza attraverso richieste semplificate e concise. È perfetto per comunicazioni rapide.",
    example: "Start: Voglio ottimizzare SEO\nProvide: Sito web e-commerce\nExplain: Vendita prodotti tech\nAsk: Quali miglioramenti prioritari?\n\nRichiesta: {input}",
    template: "Start: [Inizio diretto]\nProvide: [Informazioni necessarie]\nExplain: [Spiegazione contesto]\nAsk: [Domanda chiara]\n\nCompito: {input}"
  },
  "star": {
    title: "STAR",
    description: "Situation, Task, Action, Result per descrivere scenari e risultati",
    icon: Star,
    color: "bg-yellow-600",
    category: "Narrativa",
    difficulty: "Facile",
    explanation: "STAR è perfetto per descrivere scenari complessi in modo strutturato. È particolarmente utile per case study, interviste e storytelling professionale.",
    example: "Situation: Azienda in crisi\nTask: Ristrutturazione organizzativa\nAction: Nuovo processo implementato\nResult: Efficienza +40%\n\nCaso: {input}",
    template: "Situation: [Contesto situazione]\nTask: [Compito specifico]\nAction: [Azioni intraprese]\nResult: [Risultati ottenuti]\n\nScenario: {input}"
  },
  "tag": {
    title: "TAG",
    description: "Task, Action, Goal framework per definire compiti e obiettivi finali",
    icon: Map,
    color: "bg-emerald-600",
    category: "Obiettivi",
    difficulty: "Facile",
    explanation: "TAG è un framework semplice che definisce chiaramente il task, l'azione da compiere e l'obiettivo finale. È ideale per pianificazione e project management.",
    example: "Task: Sviluppo nuovo feature\nAction: Implementazione in 2 sprint\nGoal: Migliorare user experience\n\nProgetto: {input}",
    template: "Task: [Compito]\nAction: [Azione]\nGoal: [Obiettivo finale]\n\nRichiesta: {input}"
  },
  "trace": {
    title: "TRACE",
    description: "Task, Requirements, Audience, Context, Evaluation per task professionali avanzati",
    icon: BarChart3,
    color: "bg-blue-700",
    category: "Professionale",
    difficulty: "Avanzato",
    explanation: "TRACE è un framework avanzato per task professionali, spesso usato in ricerca, analisi e marketing strutturato. Considera tutti gli aspetti critici per risultati professionali.",
    example: "Task: Analisi di mercato\nRequirements: Data-driven, actionable insights\nAudience: Executive board\nContext: Q4 planning\nEvaluation: KPI-based assessment\n\nProgetto: {input}",
    template: "Task: [Compito specifico]\nRequirements: [Requisiti]\nAudience: [Pubblico]\nContext: [Contesto]\nEvaluation: [Criteri valutazione]\n\nCompito: {input}"
  },
  "tree-of-thoughts": {
    title: "Tree of Thoughts",
    description: "Esplora multiple vie di ragionamento per trovare la soluzione migliore",
    icon: Zap,
    color: "bg-orange-500",
    category: "Ragionamento",
    difficulty: "Avanzato",
    explanation: "Il Tree of Thoughts (ToT) esplora multiple vie di ragionamento parallele, valutandone la qualità e scegliendo la migliore. È particolarmente utile per problemi con multiple soluzioni possibili.",
    example: "Problema: Come posso ottimizzare il mio tempo di studio?\n\nEsplora 3 approcci diversi:\n\nApproccio 1: Tecnica del Pomodoro\n- Vantaggi: Meno fatica, migliore concentrazione\n- Svantaggi: Interruzioni frequenti\n- Valutazione: 7/10\n\nApproccio 2: Studio intensivo a blocchi\n- Vantaggi: Approfondimento maggiore\n- Svantaggi: Fatica mentale\n- Valutazione: 6/10\n\nApproccio 3: Studio attivo con pause strategiche\n- Vantaggi: Bilanciato, sostenibile\n- Svantaggi: Richiede pianificazione\n- Valutazione: 9/10\n\nSoluzione migliore: Approccio 3",
    template: "Esplora almeno 3 approcci diversi per risolvere questo problema:\n\n{input}\n\nPer ogni approccio:\n1. Descrivi la strategia\n2. Elenca vantaggi e svantaggi\n3. Valuta l'efficacia (1-10)\n\nInfine, indica la soluzione migliore e perché."
  },
  "traci": {
    title: "TRACI",
    description: "Task, Role, Audience, Create, Intent per marketing, educazione e customer service",
    icon: Anchor,
    color: "bg-navy-600",
    category: "Marketing",
    difficulty: "Medio",
    explanation: "TRACI è specificamente progettato per creare prompt che risuonano con pubblici specifici in marketing, educazione e customer service. Considera intento e creazione.",
    example: "Task: Creare email campaign\nRole: Email marketer\nAudience: Nuovi clienti\nCreate: Welcome series\nIntent: Onboarding efficace\n\nCampagna: {input}",
    template: "Task: [Compito]\nRole: [Ruolo]\nAudience: [Pubblico target]\nCreate: [Output richiesto]\nIntent: [Intento comunicativo]\n\nCompito: {input}"
  },
  "zero-shot": {
    title: "Zero Shot",
    description: "Richiede al modello di eseguire un compito senza esempi precedenti",
    icon: Lightbulb,
    color: "bg-yellow-500",
    category: "Apprendimento",
    difficulty: "Facile",
    explanation: "Zero Shot richiede al modello di eseguire un compito senza fornire esempi. Si basa sulle conoscenze preesistenti del modello e sulla chiarezza delle istruzioni.",
    example: "Classifica il seguente testo in una delle categorie: Politica, Sport, Tecnologia, Intrattenimento.\n\nTesto: 'L'azienda ha appena lanciato un nuovo smartphone con fotocamera da 108MP'\n\nCategoria:",
    template: "{input}\n\nIstruzioni: Rispondi direttamente alla richiesta basandoti sulle tue conoscenze. Sii chiaro, conciso e preciso."
  }
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Facile": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Medio": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Avanzato": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export default function FrameworkPage() {
  const params = useParams()
  const router = useRouter()
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<ApiProvider>('zai')
  
  const { apiKeys, hasValidKey, getApiKey } = useApiKeysStore()

  const framework = frameworksData[params.id as keyof typeof frameworksData]

  if (!framework) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Framework non trovato</h1>
          <Link href="/">
            <Button>Torna alla home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = framework.icon

  const handleTest = async () => {
    if (!input.trim()) return

    // Verifica che l'utente abbia una chiave API valida per il provider selezionato
    if (!hasValidKey(selectedProvider)) {
      setResult(`⚠️ Nessuna chiave API configurata per ${selectedProvider.toUpperCase()}. Vai in Impostazioni per configurare la tua chiave.`)
      return
    }

    setLoading(true)
    setResult("")

    const maxRetries = 3
    let retryCount = 0

    const tryRequest = async (): Promise<void> => {
      try {
        const apiKey = getApiKey(selectedProvider)
        
        const response = await fetch('/api/test-framework', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            framework: params.id,
            input: input,
            template: framework.template,
            provider: selectedProvider,
            apiKey: apiKey
          }),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        
        if (data.success) {
          setResult(data.result)
        } else {
          setResult("Errore: " + data.error)
        }
      } catch (error) {
        console.error('Framework test error:', error)
        
        if (retryCount < maxRetries) {
          retryCount++
          setResult(`Tentativo ${retryCount}/${maxRetries}... Connessione fallita, riprovo...`)
          await new Promise(resolve => setTimeout(resolve, 2000 * retryCount))
          return tryRequest()
        }
        
        if (error instanceof Error) {
          if (error.message.includes('Failed to fetch')) {
            setResult("Errore di connessione al server. Controlla la tua connessione e riprova.")
          } else if (error.message.includes('HTTP error')) {
            setResult(`Errore del server: ${error.message}`)
          } else {
            setResult(`Errore: ${error.message}`)
          }
        } else {
          setResult("Errore di connessione. Riprova più tardi.")
        }
      }
    }

    await tryRequest()
    setLoading(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Torna ai framework
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-lg ${framework.color} bg-opacity-10`}>
              <IconComponent className={`h-8 w-8 ${framework.color.replace('bg-', 'text-')}`} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{framework.title}</h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{framework.category}</Badge>
                <Badge 
                  variant="outline" 
                  className={getDifficultyColor(framework.difficulty)}
                >
                  {framework.difficulty}
                </Badge>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground text-lg">{framework.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Colonna sinistra - Informazioni e Input */}
          <div className="space-y-6">
            {/* Spiegazione */}
            <Card>
              <CardHeader>
                <CardTitle>Come funziona</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{framework.explanation}</p>
              </CardContent>
            </Card>

            {/* Esempio */}
            <Card>
              <CardHeader>
                <CardTitle>Esempio pratico</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap font-mono">
                    {framework.example}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Input test */}
            <Card>
              <CardHeader>
                <CardTitle>Testa il framework</CardTitle>
                <CardDescription>
                  Inserisci una frase o domanda per testare questo framework
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Provider AI</Label>
                  <Select value={selectedProvider} onValueChange={(value: ApiProvider) => setSelectedProvider(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          🧠 OpenAI (GPT-4, GPT-3.5)
                        </div>
                      </SelectItem>
                      <SelectItem value="gemini">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          🤖 Google Gemini
                        </div>
                      </SelectItem>
                      <SelectItem value="zai">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          ⚡ ZAI
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {!hasValidKey(selectedProvider) && (
                    <Alert>
                      <Key className="h-4 w-4" />
                      <AlertDescription>
                        Nessuna chiave {selectedProvider.toUpperCase()} configurata. 
                        <Link href="/impostazioni" className="underline ml-1">
                          Configura ora
                        </Link>
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
                
                <Textarea
                  placeholder="Inserisci qui il tuo testo o domanda..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
                <Button 
                  onClick={handleTest} 
                  disabled={!input.trim() || loading || !hasValidKey(selectedProvider)}
                  className="w-full"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Elaborazione in corso...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Testa Framework
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Colonna destra - Risultato */}
          <div className="space-y-6">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Risultato</CardTitle>
                  {result && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ) : result ? (
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm whitespace-pre-wrap">
                      {result}
                    </pre>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-12">
                    <IconComponent className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Inserisci un testo e clicca "Testa Framework" per vedere il risultato</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}