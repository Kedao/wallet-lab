import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Camera, Fingerprint, Zap, Lock, RotateCcw } from 'lucide-react'
import { EntropyVisualizer } from './components/EntropyVisualizer'
import type { WalletData } from '../types'

interface EntropyStepProps {
  data: WalletData
  onNext: () => void
  onRegenerate?: () => void
}

export function EntropyStep({ data, onNext, onRegenerate }: EntropyStepProps) {
  const [captured, setCaptured] = useState(false)
  const [displayHex, setDisplayHex] = useState('')

  // Reset captured state if data changes (implies regeneration)
  useEffect(() => {
    // If data changes, we assume it's a new generation. 
    // We intentionally do NOT auto-reset 'captured' here because the parent's regeneration
    // might happen before we clicked 'retry' in some flows, but here 'retry' calls parent.
    // However, if we click retry, we manually setCaptured(false) in the handler.
  }, [data])

  const handleRegenerate = () => {
    setCaptured(false)
    onRegenerate?.()
  }

  // Random hex generator effect (Matrix style)
  useEffect(() => {
    if (captured) {
        setDisplayHex(data.entropy.replace('0x', ''))
        return
    }
    
    // Using a shorter interval for more chaos
    const chars = '0123456789ABCDEF'
    const interval = setInterval(() => {
        let str = ''
        // Generate enough characters to fill the line
        for(let i=0; i<32; i++) {
            str += chars[Math.floor(Math.random() * 16)]
        }
        setDisplayHex(str)
    }, 40)
    
    return () => clearInterval(interval)
  }, [captured, data.entropy])

  const handleCapture = () => {
    setCaptured(true)
  }

  return (
    <div className="relative w-full min-h-[600px] h-[70vh] rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl flex flex-col items-center justify-center">
        {/* Background Animation */}
        <EntropyVisualizer paused={captured} />
        
        {/* White Flash Overlay */}
        <AnimatePresence>
            {captured && (
                <motion.div 
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-white pointer-events-none z-20"
                />
            )}
        </AnimatePresence>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl p-6 text-center">
            
            {/* Header / Status */}
            <motion.div 
                layout
                className="mb-8 space-y-2 pointer-events-none select-none"
            >
                <div className="flex items-center justify-center gap-2 mb-2">
                    {captured ? <Lock className="w-5 h-5 text-green-400" /> : <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />}
                    <span className={`text-sm tracking-widest uppercase font-bold ${captured ? "text-green-400" : "text-yellow-500 shadow-glow"}`}>
                        {captured ? "Entropy Locked" : "Hardware Noise Detected"}
                    </span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-mono text-white font-bold tracking-tighter drop-shadow-md">
                    {captured ? "128-BIT SECURITY" : "GATHERING ENTROPY"}
                </h2>
            </motion.div>

            {/* Hex Display */}
            <div className={`bg-black/50 backdrop-blur-sm border transition-all duration-500 px-6 py-8 rounded-2xl mb-8 w-full max-w-4xl shadow-xl overflow-hidden ${captured ? "border-green-500/30" : "border-slate-700/50"}`}>
                 <p className="text-slate-500 text-xs uppercase tracking-[0.2em] mb-4 select-none">raw_entropy_stream</p>
                 <div className="w-full overflow-x-auto overflow-y-hidden no-scrollbar">
                     <code className={`text-2xl md:text-4xl font-mono whitespace-nowrap leading-tight tracking-widest transition-all duration-300 block w-full text-center ${captured ? "text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" : "text-slate-300 blur-[0.5px] opacity-80"}`}>
                        {displayHex}
                     </code>
                 </div>
            </div>

            {/* Controls */}
            <AnimatePresence mode="wait">
                {!captured ? (
                    <motion.div
                        key="capture-btn"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <Button 
                            size="lg" 
                            onClick={handleCapture}
                            className="h-16 px-12 text-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-wider rounded-full shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all hover:scale-105 active:scale-95 border-2 border-yellow-300"
                        >
                            <Camera className="mr-3 w-6 h-6" />
                            Capture Entropy
                        </Button>
                    </motion.div>
                ) : (
                   <motion.div
                        key="result-card"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="bg-slate-900/90 backdrop-blur-md border border-slate-700/80 p-6 rounded-xl max-w-xl w-full text-left shadow-2xl relative"
                   >
                        <div className="absolute -top-3 -right-3">
                             <span className="relative flex h-6 w-6">
                               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                               <span className="relative inline-flex rounded-full h-6 w-6 bg-green-500"></span>
                             </span>
                        </div>

                        <div className="mb-6 space-y-3">
                            <h4 className="text-white font-semibold flex items-center gap-2 text-lg">
                                <Fingerprint className="w-5 h-5 text-green-400" />
                                Unique Fingerprint Created
                            </h4>
                            <p className="text-sm text-slate-300 leading-relaxed font-light">
                                We froze the chaotic hardware & cosmic noise simulation at a precise nanosecond. 
                                This 128-bit string is your unique key to the blockchain universe.
                                <br/><br/>
                                <span className="text-slate-400 text-xs">It contains $2^{128}$ possibilities. Guessing it is physically impossible.</span>
                            </p>
                        </div>
                        <div className="flex gap-4 pt-4 border-t border-slate-700/50">
                             {onRegenerate && (
                                <Button onClick={handleRegenerate} variant="outline" className="flex-1 border-slate-600 hover:bg-slate-800 text-slate-300 hover:text-white">
                                    <RotateCcw className="mr-2 w-4 h-4" />
                                    Retry
                                </Button>
                             )}
                             <Button onClick={onNext} size="lg" className="flex-[2] bg-blue-600 hover:bg-blue-500 font-semibold shadow-lg shadow-blue-900/20 text-white">
                                Encrypt to Mnemonic <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                   </motion.div>
                )}
            </AnimatePresence>
        </div>
    </div>
  )
}
