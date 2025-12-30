/**
 * Blockchain network configuration
 */

export const CHAIN_IDS = {
  MAINNET: 1,
  SEPOLIA: 11155111,
} as const

export const CHAIN_NAMES = {
  [CHAIN_IDS.MAINNET]: 'Ethereum Mainnet',
  [CHAIN_IDS.SEPOLIA]: 'Sepolia Testnet',
} as const

export type ChainId = (typeof CHAIN_IDS)[keyof typeof CHAIN_IDS]
