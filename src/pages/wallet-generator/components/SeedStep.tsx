import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Binary } from 'lucide-react'
import { WalletData } from './types'

interface SeedStepProps {
  data: WalletData
  onNext: () => void
}

export function SeedStep({ data, onNext }: SeedStepProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto border-l-8 border-l-orange-500 shadow-xl">
      <CardHeader>
         <div className="flex items-center gap-4 mb-2">
           <div className="p-3 bg-orange-100 dark:bg-orange-900/40 rounded-xl">
             <Binary className="w-8 h-8 text-orange-600 dark:text-orange-400" />
           </div>
           <div>
             <CardTitle className="text-2xl">Step 3: Master Seed</CardTitle>
             <CardDescription className="text-base">PBKDF2 Hashing (512 bits)</CardDescription>
           </div>
         </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <p className="text-xs text-slate-500 mb-2 font-mono uppercase">Output seed (Hex)</p>
          <div className="font-mono text-sm break-all text-orange-300 dark:text-orange-400 leading-6 tracking-wide">
             {data.seed}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-100 dark:border-orange-900">
             <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Hashing Function</h4>
             <p className="text-sm text-orange-800 dark:text-orange-200">
               We used <b>PBKDF2</b> (Password-Based Key Derivation Function 2) with HMAC-SHA512.
             </p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-100 dark:border-orange-900">
             <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">Hardening</h4>
             <p className="text-sm text-orange-800 dark:text-orange-200">
               The process includes <b>2048 rounds</b> of hashing to make brute-force attacks computationally expensive.
             </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t bg-muted/20 p-6">
        <div className="text-sm text-muted-foreground">
          Next: Derive Account Keys
        </div>
         <Button onClick={onNext} size="lg" className="gap-2">
          Derive Keys <ArrowRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
