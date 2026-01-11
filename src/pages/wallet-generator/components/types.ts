export interface WalletData {
  entropy: string
  entropyBytes: Uint8Array
  mnemonic: string[]
  seed: string
  path: string
  privateKey: string
  address: string
}
