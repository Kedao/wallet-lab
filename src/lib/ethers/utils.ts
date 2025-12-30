import { formatEther as ethersFormatEther, parseEther as ethersParseEther } from 'ethers'

/**
 * Format Wei to Ether string
 * @param wei - Amount in Wei (as bigint or string)
 * @returns Formatted Ether string
 */
export function formatEther(wei: bigint | string): string {
  return ethersFormatEther(wei)
}

/**
 * Parse Ether string to Wei
 * @param ether - Amount in Ether as string
 * @returns Amount in Wei as bigint
 */
export function parseEther(ether: string): bigint {
  return ethersParseEther(ether)
}

/**
 * Format address to short display format (0x1234...5678)
 * @param address - Full Ethereum address
 * @param prefixLength - Number of characters to show at start (default: 6)
 * @param suffixLength - Number of characters to show at end (default: 4)
 * @returns Shortened address string
 */
export function formatAddress(
  address: string,
  prefixLength: number = 6,
  suffixLength: number = 4
): string {
  if (!address || address.length < prefixLength + suffixLength) {
    return address
  }
  return `${address.slice(0, prefixLength)}...${address.slice(-suffixLength)}`
}

/**
 * Validate Ethereum address format
 * @param address - Address to validate
 * @returns True if valid address format
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}
