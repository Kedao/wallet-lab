import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Shield } from 'lucide-react'
import { WalletData } from './types'

interface MnemonicStepProps {
  data: WalletData
  onNext: () => void
}

export function MnemonicStep({ data, onNext }: MnemonicStepProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto border-l-8 border-l-purple-500 shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-4 mb-2">
           <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl">
            <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
           </div>
           <div>
             <CardTitle className="text-2xl">Step 2: Mnemonic Phrase</CardTitle>
             <CardDescription className="text-base">BIP-39 Standard (12 Words)</CardDescription>
           </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
         <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
           {data.mnemonic.map((word, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.05 }}
               className="relative group p-4 bg-slate-100 dark:bg-slate-800 border-2 border-transparent hover:border-purple-400 rounded-xl text-center transition-all"
             >
               <span className="absolute top-2 left-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{String(i + 1).padStart(2, '0')}</span>
               <span className="font-bold text-lg text-slate-800 dark:text-slate-200">{word}</span>
             </motion.div>
           ))}
         </div>

         <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-900">
           <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-1">Standardized Mapping</h4>
           <p className="text-sm text-purple-800 dark:text-purple-200 leading-relaxed">
             The entropy bits are checksummed and split into 12 groups. Each group maps to a word from a standard dictionary of 2048 words.
             This represents your key in a format that is easy to write down and backup physically.
           </p>
         </div>
      </CardContent>
      <CardFooter className="justify-between border-t bg-muted/20 p-6">
        <div className="text-sm text-muted-foreground">
          Next: Stretch phrase into a cryptographic seed
        </div>
        <Button onClick={onNext} size="lg" className="gap-2">
          Generate Seed <ArrowRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
