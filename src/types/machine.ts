export interface Machine {
  id: string
  name: string
  status: 'Running' | 'Stopped' | 'Failed'
  description: string
  overlayIp: string
  host: string
  publicIp: string
  machineId: number
  // provider: string
  active: boolean
  machineType: number
  region: number
  cpuCores: number
  gpuCores: number
  gpuMemory: number
  memoryMB: number
  diskGB: number
  uploadSpeed: number
  downloadSpeed: number
  createdAt: number
  expiredAt: number
  updatedAt: number
  removedAt: number
  unlockTime: number
  stakeAmount: number
  withdrawalProcessed: boolean
  metadata: string
  cpuPricePerSecond: number
  gpuPricePerSecond: number
  memoryPricePerSecond: number
  diskPricePerSecond: number
}


export interface ProviderOffer {
  id: string
  providerName: string
  providerAddress: string
  price: number
  currency: string
  system: {
    cpu: string
    ram: string
    disk: string
    uploadMb: string
    downloadMb: string
  }
  status: "available" | "accepted" | "expired"
}