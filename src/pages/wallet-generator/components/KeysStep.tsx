import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RefreshCw, Key, Lock, CheckCircle2 } from 'lucide-react'
import { WalletData } from './types'

interface KeysStepProps {
  data: WalletData
  onReset: () => void
}

export function KeysStep({ data, onReset }: KeysStepProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto border-l-8 border-l-green-500 shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-4 mb-2">
           <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-xl">
             <Key className="w-8 h-8 text-green-600 dark:text-green-400" />
           </div>
           <div>
             <CardTitle className="text-2xl">Step 4: Identity & Keys</CardTitle>
             <CardDescription className="text-base">Address generation complete</CardDescription>
           </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Path Info */}
        <div className="flex items-center gap-2 p-2 px-4 bg-slate-100 dark:bg-slate-800 rounded-full w-fit mx-auto text-sm font-mono text-slate-500">
           <span>Derivation Path:</span>
           <span className="text-foreground font-bold">{data.path}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           {/* Private Key Section */}
           <div className="space-y-3">
             <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <Lock className="w-4 h-4" />
                <h3 className="font-semibold">Private Key</h3>
             </div>
             <div className="group relative">
               <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-lg break-all font-mono text-sm text-red-800 dark:text-red-300 blur-sm group-hover:blur-0 transition-all duration-300">
                  {data.privateKey}
               </div>
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-red-200">
                    HOVER TO REVEAL
                  </span>
               </div>
             </div>
             <p className="text-xs text-muted-foreground">
               This 256-bit integer signs transactions. Never share this.
             </p>
           </div>

           {/* Public Address Section */}
           <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                <h3 className="font-semibold">Public Address</h3>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900/50 rounded-lg break-all font-mono text-xl font-bold text-green-800 dark:text-green-300">
                 {data.address}
              </div>
              <p className="text-xs text-muted-foreground">
                Last 20 bytes of the public key's keccak256 hash. Safe to share.
              </p>
           </div>
        </div>

      </CardContent>
      <CardFooter className="justify-between border-t bg-muted/20 p-6">
        <div className="text-sm text-muted-foreground">
           Process Complete
        </div>
        <Button onClick={onReset} variant="outline" size="lg" className="gap-2">
           <RefreshCw className="w-4 h-4" /> Start Over
        </Button>
      </CardFooter>
    </Card>
  )
}
