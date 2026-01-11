import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Hash, Binary } from 'lucide-react'
import { WalletData } from './types'

interface EntropyStepProps {
  data: WalletData
  onNext: () => void
}

export function EntropyStep({ data, onNext }: EntropyStepProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto border-l-8 border-l-blue-500 shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl">
            <Hash className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
             <CardTitle className="text-2xl">Step 1: Entropy Generation</CardTitle>
             <CardDescription className="text-base">The source of all security (128 bits)</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-6 bg-slate-950 rounded-xl overflow-hidden relative group">
           {/* Visual Matrix Effect Placeholder */}
           <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
             <Binary className="w-24 h-24 text-blue-500" />
           </div>
           
           <p className="text-slate-400 text-sm mb-4 font-mono uppercase tracking-wider">Raw Hex Output</p>
           <code className="text-3xl md:text-4xl text-blue-400 font-mono break-all leading-relaxed tracking-widest shadow-glow">
             {data.entropy.replace('0x', '')}
           </code>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            How it works
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
            Wallet security relies on randomness. We generated <b>16 bytes</b> (128 bits) of cryptographic entropy. 
            There are $2^{128}$ possible combinations—more than the number of atoms in the known universe. 
            Guessing this number is impossible.
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t bg-muted/20 p-6">
        <div className="text-sm text-muted-foreground">
          Next: Convert bits to human words
        </div>
        <Button onClick={onNext} size="lg" className="gap-2">
          Encrypt to Mnemonic <ArrowRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
