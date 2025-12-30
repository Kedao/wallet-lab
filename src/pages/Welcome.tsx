import { useWalletStore } from '@/stores'
import { CHAIN_IDS, CHAIN_NAMES } from '@/config/constants'

function Welcome() {
  const { address, chainId, isConnected } = useWalletStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Wallet Lab
            </h1>
            <p className="text-xl text-muted-foreground">
              React + TypeScript + Vite + ethers.js v6 + Zustand
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-card border rounded-lg shadow-lg p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Welcome to Wallet Lab</h2>
              <p className="text-muted-foreground">
                A modern frontend application for Ethereum wallet functionality.
              </p>
            </div>

            {/* Status Section */}
            <div className="border-t pt-6 space-y-4">
              <h3 className="text-lg font-semibold">Connection Status</h3>
              
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
                  <span className="font-medium">Status:</span>
                  <span className={isConnected ? 'text-green-600' : 'text-slate-500'}>
                    {isConnected ? '🟢 Connected' : '⚪ Not Connected'}
                  </span>
                </div>

                {address && (
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
                    <span className="font-medium">Address:</span>
                    <code className="text-sm bg-background px-2 py-1 rounded">
                      {address.slice(0, 6)}...{address.slice(-4)}
                    </code>
                  </div>
                )}

                {chainId && (
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-md">
                    <span className="font-medium">Network:</span>
                    <span className="text-sm">
                      {CHAIN_NAMES[chainId as keyof typeof CHAIN_NAMES] || `Chain ID: ${chainId}`}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Features Section */}
            <div className="border-t pt-6 space-y-4">
              <h3 className="text-lg font-semibold">Features</h3>
              
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">⚡</span>
                  <span>Fast development with Vite and React 18</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔷</span>
                  <span>Type-safe with TypeScript</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🎨</span>
                  <span>Beautiful UI with Tailwind CSS and shadcn/ui</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🦊</span>
                  <span>Ethereum integration with ethers.js v6</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🐻</span>
                  <span>State management with Zustand</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🔗</span>
                  <span>Support for Ethereum Mainnet and Sepolia Testnet</span>
                </li>
              </ul>
            </div>

            {/* Next Steps */}
            <div className="border-t pt-6 space-y-4">
              <h3 className="text-lg font-semibold">Next Steps</h3>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>🚀 The project structure is ready for you to implement:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Wallet connection (MetaMask, WalletConnect)</li>
                  <li>Transaction management</li>
                  <li>Smart contract interactions</li>
                  <li>Multi-chain support expansion</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Built with ❤️ using modern web technologies</p>
            <p className="mt-2">
              Supported Networks: {CHAIN_NAMES[CHAIN_IDS.MAINNET]} • {CHAIN_NAMES[CHAIN_IDS.SEPOLIA]}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
