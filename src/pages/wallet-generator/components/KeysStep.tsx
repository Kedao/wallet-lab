import { StepLayout } from './StepLayout'
import { WalletData } from './types'
import { Key, RotateCcw, Copy, Fingerprint, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface KeysStepProps {
  data: WalletData
  onReset: () => void
}

export function KeysStep({ data, onReset }: KeysStepProps) {
  const [revealed, setRevealed] = useState(false)

  return (
    <StepLayout
      title="Key Derivation"
      subtitle="BIP-32 / BIP-44 Hierarchical Deterministic"
      icon={Key}
      color="green"
      footerContent={(
          <Button onClick={onReset} variant="destructive" className="w-full bg-red-900/50 hover:bg-red-800 text-red-100 border border-red-500/30">
             <RotateCcw className="mr-2 w-4 h-4" /> Reset & Destroy Keys
          </Button>
      )}
    >
      <div className="space-y-4 h-full flex flex-col justify-center">
        
        {/* Derivation Path HUD */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-3 bg-slate-800/50 rounded border border-slate-700 gap-2">
             <div className="flex items-center gap-2">
                 <GitMergeIcon className="text-purple-400 w-5 h-5" />
                 <div>
                    <label className="text-[9px] text-slate-500 font-mono block uppercase">Derivation Path</label>
                    <code className="text-purple-300 font-mono font-bold text-base">{data.path}</code>
                 </div>
             </div>
             <div className="text-[10px] text-slate-500 text-right font-mono hidden md:block">
                 m / purpose' / coin_type' / account' / change / index
             </div>
        </div>

        {/* Public Address (Identity) */}
        <div className="space-y-1.5 flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-green-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Fingerprint className="w-3.5 h-3.5" /> Public Identity (Address)
            </div>
            <div className="bg-green-900/10 border border-green-500/30 p-4 rounded-lg relative overflow-hidden group">
                 <div className="absolute top-2 right-2 opacity-50">
                    <Copy className="w-4 h-4 text-green-500 cursor-pointer hover:text-green-300 transition-colors" />
                 </div>
                 <code className="text-sm md:text-xl font-mono text-green-400 break-all drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">
                    {data.address}
                 </code>
                 <div className="mt-2 flex gap-4 text-[10px] text-green-700/80 font-mono uppercase">
                     <span>Network: Ethereum</span>
                     <span>Type: EOA</span>
                 </div>
            </div>
        </div>

        {/* Private Key (Secret) */}
        <div className="space-y-1.5 mt-auto">
            <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" /> Private Key (Top Secret)
            </div>
            <div 
                className="relative bg-red-950/20 border border-red-500/20 p-4 rounded-lg overflow-hidden cursor-pointer group"
                onMouseEnter={() => setRevealed(true)}
                onMouseLeave={() => setRevealed(false)}
            >
                 {/* Danger Stripes Background */}
                 <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 10px, #ef4444 10px, #ef4444 20px)' }} />

                 <div className="relative z-10 transition-all duration-300">
                     <code className={`block text-sm md:text-lg font-mono break-all text-red-400 transition-filter duration-300 ${revealed ? 'blur-0' : 'blur-md select-none'}`}>
                        {data.privateKey}
                     </code>
                 </div>
                 
                 {/* Overlay Text */}
                 <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none ${revealed ? 'opacity-0' : 'opacity-100'}`}>
                      <span className="bg-red-900/80 text-red-100 px-3 py-1 rounded border border-red-500/50 text-xs font-bold tracking-widest shadow-xl backdrop-blur-sm">
                          HOVER TO REVEAL
                      </span>
                 </div>
            </div>
            <p className="text-[10px] text-red-400/60 text-center font-mono mt-2">
                WARNING: NEVER SHARE THIS KEY. ANYONE WITH THIS KEY CONTROLS YOUR FUNDS.
            </p>
        </div>

      </div>
    </StepLayout>
  )
}

function GitMergeIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>
    )
}
