import { create } from 'zustand'

export const useWalletStore = create<{
  address: string | null
  chainId: number | null
  isConnected: boolean
}>(() => ({
  address: null,
  chainId: null,
  isConnected: false,
}))
