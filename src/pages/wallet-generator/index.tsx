import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ethers } from 'ethers'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Key, Shield, Hash, Binary } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { WalletData } from './components/types'
import { IntroStep } from './components/IntroStep'
import { EntropyStep } from './components/EntropyStep'
import { MnemonicStep } from './components/MnemonicStep'
import { SeedStep } from './components/SeedStep'
import { KeysStep } from './components/KeysStep'

const STEPS = [
  { id: 'entropy', title: 'Entropy', icon: Hash, desc: 'Randomness Generation' },
  { id: 'mnemonic', title: 'Mnemonic', icon: Shield, desc: 'BIP-39 Phrase' },
  { id: 'seed', title: 'Seed', icon: Binary, desc: 'PBKDF2 Hashing' },
  { id: 'keys', title: 'Keys', icon: Key, desc: 'Key Derivation' },
]

export default function WalletGenerator() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(-1) // -1 is Intro
  const [isGenerating, setIsGenerating] = useState(false)
  const [walletData, setWalletData] = useState<WalletData | null>(null)
  const [direction, setDirection] = useState(0)

  // Generate wallet logic
  const generateWallet = async () => {
    setIsGenerating(true)
    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 200))

    try {
      // 1. Generate Entropy
      const entropyBytes = ethers.randomBytes(16)
      const entropy = ethers.hexlify(entropyBytes)
      
      // 2. Derive Mnemonic
      const mnemonicObj = ethers.Mnemonic.fromEntropy(entropyBytes)
      const words = mnemonicObj.phrase.split(' ')

      // 3. Convert to Seed
      const seed = mnemonicObj.computeSeed()

      // 4. Derive Path & Wallet
      const path = "m/44'/60'/0'/0/0"
      const hdNode = ethers.HDNodeWallet.fromSeed(seed)
      const wallet = hdNode.derivePath(path)

      setWalletData({
        entropy,
        entropyBytes,
        mnemonic: words,
        seed,
        path,
        privateKey: wallet.privateKey,
        address: wallet.address
      })
      
      // Move to first step
      setDirection(1)
      setCurrentStep(0)
    } catch (error) {
      console.error("Failed to generate wallet:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection(1)
      setCurrentStep(c => c + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep(c => c - 1)
    } else {
      setDirection(-1)
      setCurrentStep(-1) // Back to Title
    }
  }

  const handleReset = () => {
    setDirection(-1)
    setCurrentStep(-1)
    setTimeout(() => setWalletData(null), 300)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-950 dark:to-slate-900 flex flex-col p-4 md:p-8 overflow-hidden relative">
       
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-8 z-10 relative">
        <Button variant="ghost" className="gap-2" onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4" /> Exit
        </Button>
        
        {/* Step Indicator (Only valid steps) */}
        {currentStep >= 0 && (
          <div className="hidden md:flex items-center gap-2 bg-white/50 dark:bg-black/20 p-2 rounded-full backdrop-blur-sm">
            {STEPS.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isPast = index < currentStep
              return (
                <div 
                  key={step.id} 
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                    isActive ? "bg-primary text-primary-foreground shadow-sm" : 
                    isPast ? "text-primary opacity-60" : "text-muted-foreground opacity-40"
                  )}
                >
                  <Icon className="w-3 h-3" />
                  {step.title}
                </div>
              )
            })}
          </div>
        )}
        
        <div className="w-[88px]" /> {/* Spacer */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center relative w-full h-full max-w-5xl mx-auto">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          {currentStep === -1 ? (
             <motion.div 
               key="intro"
               variants={variants}
               custom={direction}
               initial="enter"
               animate="center"
               exit="exit"
               className="absolute w-full"
             >
               <IntroStep onGenerate={generateWallet} isGenerating={isGenerating} />
             </motion.div>
          ) : currentStep === 0 && walletData ? (
            <motion.div 
              key="step1"
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
               className="absolute w-full"
            >
              <EntropyStep 
                data={walletData} 
                onNext={handleNext} 
                onRegenerate={generateWallet}
              />
            </motion.div>
          ) : currentStep === 1 && walletData ? (
            <motion.div 
              key="step2"
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full"
            >
              <MnemonicStep data={walletData} onNext={handleNext} />
            </motion.div>
          ) : currentStep === 2 && walletData ? (
            <motion.div 
              key="step3"
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full"
            >
              <SeedStep data={walletData} onNext={handleNext} />
            </motion.div>
          ) : currentStep === 3 && walletData ? (
            <motion.div 
              key="step4"
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full"
            >
              <KeysStep data={walletData} onReset={handleReset} />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      
      {/* Bottom control hints if needed */}
      {currentStep >= 0 && (
         <div className="absolute bottom-8 left-0 right-0 text-center z-10 pointer-events-none">
           <div className="inline-flex gap-4 pointer-events-auto">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleBack}
                className="rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
           </div>
         </div>
      )}

    </div>
  )
}