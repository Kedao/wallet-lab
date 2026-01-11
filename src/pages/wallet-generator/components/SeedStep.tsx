import { StepLayout } from './StepLayout'
import { WalletData } from './types'
import { Binary, Flame } from 'lucide-react'

interface SeedStepProps {
  data: WalletData
  onNext: () => void
}

export function SeedStep({ data, onNext }: SeedStepProps) {
  return (
    <StepLayout
      title="PBKDF2 Hashing"
      subtitle="Key Stretching & Salt Integration"
      icon={Binary}
      color="yellow"
      onNext={onNext}
      nextLabel="Derive Keys"
    >
      <div className="space-y-4 h-full flex flex-col justify-center">
        {/* Reactor Core Visual - Compact */}
        <div className="relative p-4 border border-yellow-500/20 bg-yellow-900/10 rounded-lg flex flex-col items-center text-center">
             <div className="absolute top-2 right-2 flex gap-1">
                 <div className="w-1 h-1 bg-yellow-500 rounded-full animate-ping" />
                 <div className="w-1 h-1 bg-yellow-500 rounded-full animate-ping delay-75" />
             </div>
             
             <div className="flex items-center gap-3 mb-2">
                <Flame className="w-6 h-6 text-yellow-500 animate-pulse opacity-80" />
                <h3 className="text-yellow-400 font-mono text-base font-bold">HMAC-SHA512 Reactor</h3>
             </div>
             <p className="text-yellow-200/60 text-xs max-w-lg">
                2048 rounds of hashing entropy + "mnemonic" salt. Brute-force resistant.
             </p>
        </div>

        {/* Master Seed Display */}
        <div className="space-y-2 flex-1 flex flex-col justify-center">
             <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 px-1">
                 <span>OUTPUT_BUFFER</span>
                 <span>512-BIT</span>
             </div>
             <div className="break-all bg-black border border-slate-700 p-4 rounded-md font-mono text-xs md:text-sm leading-relaxed text-slate-300 relative shadow-inner group overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
                 {data.seed}
                 <span className="inline-block w-2 h-3 bg-yellow-500 ml-1 animate-pulse" />
             </div>
        </div>

        {/* Technical Specs Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-auto">
            {[
                { label: "ALGORITHM", value: "PBKDF2" },
                { label: "ROUNDS", value: "2048" },
                { label: "HASH", value: "SHA512" },
                { label: "SIZE", value: "64 B" }
            ].map((spec, i) => (
                <div key={i} className="bg-slate-800/40 border border-slate-700 p-2 rounded flex flex-col items-center justify-center">
                    <span className="text-[9px] text-slate-500 tracking-wider mb-0.5">{spec.label}</span>
                    <span className="text-xs font-bold text-yellow-500 font-mono">{spec.value}</span>
                </div>
            ))}
        </div>
      </div>
    </StepLayout>
  )
}
