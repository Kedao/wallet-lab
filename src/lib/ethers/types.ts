import type { Provider, Signer } from 'ethers'

/**
 * Wallet state interface for Zustand store
 */
export interface WalletState {
  address: string | null
  chainId: number | null
  provider: Provider | null
  signer: Signer | null
  isConnected: boolean
  balance: string | null
}

/**
 * Network information interface
 */
export interface NetworkInfo {
  chainId: number
  name: string
  rpcUrl: string
}
