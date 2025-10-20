import { 
  Target, TrendingUp, GitBranch, Users, Compass, Star, PenTool, Eye, Brain, 
  Sparkles, Award, CheckCircle, Flag, FileText, UserCheck, Layers, Clock, 
  Crosshair, Zap, Search, Map, Anchor, BarChart3, Lightbulb 
} from "lucide-react"

export interface Framework {
  id: string
  title: string
  description: string
  icon: any
  color: string
  category: string
  difficulty: "Facile" | "Medio" | "Avanzato"
  explanation?: string
  example?: string
  template?: string
}

export interface MacroCategory {
  id: string
  name: string
  description: string
  icon: any
  color: string
  categories: string[]
}

export const macroCategories: MacroCategory[] = [
  {
    id: "fondamentali",
    name: "Fondamentali",
    description: "Strutture base essenziali per iniziare con il prompt engineering",
    icon: Target,
    color: "bg-blue-500",
    categories: ["Struttura", "Semplice", "Contesto"]
  },
  {
    id: "business",
    name: "Business & Professionale",
    description: "Framework ottimizzati per contesti aziendali e professionali",
    icon: Compass,
    color: "bg-emerald-500",
    categories: ["Business", "Professionale", "Documentazione"]
  },
  {
    id: "creativi",
    name: "Creativi & Marketing",
    description: "Strumenti per contenuti creativi, marketing e comunicazione",
    icon: Sparkles,
    color: "bg-purple-500",
    categories: ["Marketing", "Creativo", "Personificazione"]
  },
  {
    id: "avanzati",
    name: "Avanzati & Sistema",
    description: "Framework complessi per task specializzati e multi-agente",
    icon: Brain,
    color: "bg-red-500",
    categories: ["Ragionamento", "Sistema", "Stile", "Apprendimento"]
  },
  {
    id: "problem-solving",
    name: "Problem Solving",
    description: "Metodologie strutturate per risolvere problemi complessi",
    icon: CheckCircle,
    color: "bg-orange-500",
    categories: ["Problem Solving", "Obiettivi", "Efficienza", "Narrativa"]
  }
]

export const frameworks: Framework[] = [
  {
    id: "ape",
    title: "APE",
    description: "Struttura in tre passaggi (Action, Purpose, Expectation) ideale per principianti e content creation",
    icon: Target,
    color: "bg-emerald-500",
    category: "Struttura",
    difficulty: "Facile"
  },
  {
    id: "aida",
    title: "AIDA",
    description: "Formula di marketing (Attention, Interest, Desire, Action) adattata per prompt engineering",
    icon: TrendingUp,
    color: "bg-pink-500",
    category: "Marketing",
    difficulty: "Medio"
  },
  {
    id: "bab",
    title: "BAB",
    description: "Struttura Before-After-Bridge per presentare scenari e soluzioni connesse",
    icon: GitBranch,
    color: "bg-teal-500",
    category: "Struttura",
    difficulty: "Facile"
  },
  {
    id: "care",
    title: "CARE",
    description: "Context, Action, Result, Example per fornire contesto ed esempi chiari",
    icon: Users,
    color: "bg-rose-500",
    category: "Contesto",
    difficulty: "Medio"
  },
  {
    id: "coast",
    title: "COAST",
    description: "Context, Objective, Audience, Style, Tone per lavoro business e creativo",
    icon: Compass,
    color: "bg-blue-600",
    category: "Business",
    difficulty: "Medio"
  },
  {
    id: "costar",
    title: "COSTAR",
    description: "Framework completo per prompt writing come sfida di design full-stack",
    icon: Star,
    color: "bg-amber-500",
    category: "Business",
    difficulty: "Avanzato"
  },
  {
    id: "craft",
    title: "CRAFT",
    description: "Metodologia strutturata e adattabile per prompt ben definiti e personalizzati",
    icon: PenTool,
    color: "bg-purple-600",
    category: "Struttura",
    difficulty: "Medio"
  },
  {
    id: "crispe",
    title: "CRISPE",
    description: "Capacity/Role, Insight, Statement, Personality, Experiment per definire ruolo e personalità",
    icon: Eye,
    color: "bg-cyan-600",
    category: "Personificazione",
    difficulty: "Medio"
  },
  {
    id: "chain-of-thought",
    title: "Chain of Thought",
    description: "Guida il modello a ragionare passo dopo passo per arrivare a una soluzione",
    icon: Brain,
    color: "bg-blue-500",
    category: "Ragionamento",
    difficulty: "Medio"
  },
  {
    id: "crafting-ai",
    title: "CRAFTING AI",
    description: "Estensione di CRAFT con fasi di validazione e raffinamento continuo",
    icon: Sparkles,
    color: "bg-violet-500",
    category: "Struttura",
    difficulty: "Avanzato"
  },
  {
    id: "few-shot",
    title: "Few Shot Learning",
    description: "Fornisce esempi specifici per aiutare il modello a capire il compito richiesto",
    icon: Target,
    color: "bg-green-500",
    category: "Apprendimento",
    difficulty: "Facile"
  },
  {
    id: "grade",
    title: "GRADE",
    description: "Goal, Request, Action, Details, Example per prompt orientati agli obiettivi",
    icon: Award,
    color: "bg-indigo-500",
    category: "Obiettivi",
    difficulty: "Medio"
  },
  {
    id: "par",
    title: "PAR",
    description: "Problem, Action, Result per definire problemi e risultati desiderati",
    icon: CheckCircle,
    color: "bg-lime-500",
    category: "Problem Solving",
    difficulty: "Facile"
  },
  {
    id: "race",
    title: "RACE",
    description: "Role, Action, Context, Expectations per task professionali con expertise",
    icon: Flag,
    color: "bg-orange-600",
    category: "Professionale",
    difficulty: "Medio"
  },
  {
    id: "rascef",
    title: "RASCEF",
    description: "Role, Action, Steps, Context, Examples, Format per documentazione tecnica dettagliata",
    icon: FileText,
    color: "bg-slate-600",
    category: "Documentazione",
    difficulty: "Avanzato"
  },
  {
    id: "rhodes",
    title: "RHODES",
    description: "Role, Objective, Details, Examples, Sense Check per output personalizzati con stile",
    icon: UserCheck,
    color: "bg-fuchsia-500",
    category: "Stile",
    difficulty: "Avanzato"
  },
  {
    id: "roses",
    title: "ROSES",
    description: "Role, Objective, Style, Example, Scenario per contenuti creativi e marketing",
    icon: Layers,
    color: "bg-pink-600",
    category: "Creativo",
    difficulty: "Medio"
  },
  {
    id: "rtf",
    title: "RTF",
    description: "Role, Task, Finish framework semplice per definire ruolo e stato di completamento",
    icon: Clock,
    color: "bg-stone-500",
    category: "Semplice",
    difficulty: "Facile"
  },
  {
    id: "smart",
    title: "SMART",
    description: "Specific, Measurable, Achievable, Relevant, Time-bound per obiettivi chiari",
    icon: Crosshair,
    color: "bg-green-600",
    category: "Obiettivi",
    difficulty: "Medio"
  },
  {
    id: "sparc",
    title: "SPARC System",
    description: "Framework multi-agente con template strutturati e operazioni cognitive",
    icon: Zap,
    color: "bg-red-600",
    category: "Sistema",
    difficulty: "Avanzato"
  },
  {
    id: "spear",
    title: "SPEAR",
    description: "Start, Provide, Explain, Ask, Rinse & Repeat per richieste concise ed efficienti",
    icon: Search,
    color: "bg-sky-500",
    category: "Efficienza",
    difficulty: "Facile"
  },
  {
    id: "star",
    title: "STAR",
    description: "Situation, Task, Action, Result per descrivere scenari e risultati",
    icon: Star,
    color: "bg-yellow-600",
    category: "Narrativa",
    difficulty: "Facile"
  },
  {
    id: "tag",
    title: "TAG",
    description: "Task, Action, Goal framework per definire compiti e obiettivi finali",
    icon: Map,
    color: "bg-emerald-600",
    category: "Obiettivi",
    difficulty: "Facile"
  },
  {
    id: "trace",
    title: "TRACE",
    description: "Task, Requirements, Audience, Context, Evaluation per task professionali avanzati",
    icon: BarChart3,
    color: "bg-blue-700",
    category: "Professionale",
    difficulty: "Avanzato"
  },
  {
    id: "tree-of-thoughts",
    title: "Tree of Thoughts",
    description: "Esplora multiple vie di ragionamento per trovare la soluzione migliore",
    icon: Zap,
    color: "bg-orange-500",
    category: "Ragionamento",
    difficulty: "Avanzato"
  },
  {
    id: "traci",
    title: "TRACI",
    description: "Task, Role, Audience, Create, Intent per marketing, educazione e customer service",
    icon: Anchor,
    color: "bg-blue-800",
    category: "Marketing",
    difficulty: "Medio"
  },
  {
    id: "zero-shot",
    title: "Zero Shot",
    description: "Richiede al modello di eseguire un compito senza esempi precedenti",
    icon: Lightbulb,
    color: "bg-yellow-500",
    category: "Apprendimento",
    difficulty: "Facile"
  }
]

export const getFrameworksByMacroCategory = (macroCategoryId: string) => {
  const macroCategory = macroCategories.find(cat => cat.id === macroCategoryId)
  if (!macroCategory) return []
  
  return frameworks.filter(framework => 
    macroCategory.categories.includes(framework.category)
  )
}

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Facile": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Medio": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "Avanzato": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}