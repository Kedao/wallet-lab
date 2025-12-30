/**
 * Ethereum provider utilities
 * 
 * Note: This project uses backend API for blockchain queries instead of direct RPC calls.
 * The functions below are reserved for future use when wallet connection is implemented.
 * For read-only blockchain data, use the backend API endpoints.
 */

import { JsonRpcProvider } from 'ethers'
import type { Provider } from 'ethers'

/**
 * Create a read-only JSON-RPC provider for blockchain queries
 * Note: Currently not used - blockchain data is fetched via backend API
 * @param rpcUrl - The RPC endpoint URL
 * @returns A configured JsonRpcProvider instance
 */
export function createReadOnlyProvider(rpcUrl: string): Provider {
  if (!rpcUrl) {
    throw new Error('RPC URL is required to create a provider')
  }
  return new JsonRpcProvider(rpcUrl)
}

/**
 * Get provider for a specific chain ID
 * Note: Currently not used - blockchain data is fetched via backend API
 * @param chainId - The chain ID (1 for mainnet, 11155111 for sepolia)
 * @param rpcUrls - Map of chain IDs to RPC URLs
 * @returns A configured provider or null if RPC URL not found
 */
export function getProviderForChain(
  chainId: number,
  rpcUrls: Record<number, string>
): Provider | null {
  const rpcUrl = rpcUrls[chainId]
  if (!rpcUrl) {
    console.warn(`No RPC URL configured for chain ID ${chainId}`)
    return null
  }
  return createReadOnlyProvider(rpcUrl)
}
