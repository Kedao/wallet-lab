import { Button } from '@/components/ui/button'
import { RefreshCw, Lock } from 'lucide-react'

interface IntroStepProps {
  onGenerate: () => void
  isGenerating: boolean
}

export function IntroStep({ onGenerate, isGenerating }: IntroStepProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-8 max-w-2xl mx-auto mt-20">
      <div className="p-6 bg-white dark:bg-slate-800 rounded-full shadow-2xl mb-8">
        <Lock className="w-16 h-16 text-blue-600 dark:text-blue-400" />
      </div>
      <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Interactive Wallet Lab
      </h1>
      <p className="text-xl text-muted-foreground leading-relaxed">
        Understand how an Ethereum wallet is created. <br/>
        We will take you through the cryptographic journey step-by-step: <br/>
        <span className="font-semibold text-foreground">Entropy → Mnemonic → Seed → Keys</span>
      </p>
      
      <Button 
        size="lg" 
        onClick={onGenerate} 
        disabled={isGenerating}
        className="text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all gap-3"
      >
        {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
        {isGenerating ? 'Initializing Cryptography...' : 'Start Generation Process'}
      </Button>
    </div>
  )
}
