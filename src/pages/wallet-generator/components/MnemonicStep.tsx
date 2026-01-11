import { StepLayout } from './StepLayout'
import { WalletData } from './types'
import { Shield } from 'lucide-react'

interface MnemonicStepProps {
  data: WalletData
  onNext: () => void
}

export function MnemonicStep({ data, onNext }: MnemonicStepProps) {
  return (
    <StepLayout
      title="BIP-39 Mnemonic"
      subtitle="Standardized Seed Phrase Generation"
      icon={Shield}
      color="blue"
      onNext={onNext}
      nextLabel="Generate Seed"
    >
      <div className="space-y-4 h-full flex flex-col">
        {/* Info Terminal */}
        <div className="p-3 bg-black/40 border border-blue-500/20 rounded-lg font-mono text-[10px] md:text-xs text-blue-300/80 leading-tight">
           <div className="flex justify-between">
               <div>
                   <span className="text-blue-500 mr-2">$</span>
                   processing entropy_stream...
               </div>
               <span className="text-green-400">OK</span>
           </div>
           <div>
               <span className="text-blue-500 mr-2">$</span>
               mapping 128-bit {'>>'} 12-word_dictionary...
           </div>
        </div>

        {/* Word Grid - Compact */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 flex-1 overflow-visible content-center">
            {data.mnemonic.map((word, index) => (
                <div 
                    key={index} 
                    className="group relative bg-slate-800/50 hover:bg-blue-900/20 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 rounded-md p-2 md:p-3 flex flex-col items-center justify-center gap-0.5"
                >
                     <span className="absolute top-1 left-2 text-[10px] text-slate-500 font-mono group-hover:text-blue-400">
                        {(index + 1).toString().padStart(2, '0')}
                     </span>
                     <span className="text-base md:text-lg font-bold text-slate-200 group-hover:text-blue-200 tracking-wide font-mono z-10">
                        {word}
                     </span>
                     
                     {/* Tech Decoration */}
                     <div className="absolute bottom-1 right-2 w-1 h-1 bg-slate-600 rounded-full group-hover:bg-blue-400 transition-colors" />
                </div>
            ))}
        </div>
        
        <p className="text-center text-slate-400 text-xs max-w-2xl mx-auto mt-auto pt-2">
            These 12 words are the human-readable representation of your entropy. 
            <strong className="text-blue-400 ml-1">Safe to backup.</strong>
        </p>
      </div>
    </StepLayout>
  )
}
