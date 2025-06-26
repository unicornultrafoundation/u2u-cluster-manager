import { Machine } from "./machine"

export interface Cluster {
  id: string
  name: string
  status: 'Created' | 'Accepted' | 'Closed' | 'Cancelled'
  machineType: 'Docker' | 'Kubernetes' | 'Kvm'
  region?: string
  cpuCores: number
  gpuCores: number
  gpuMemory: number
  memoryMB: number
  diskGB: number
  uploadMbps: number
  downloadMbps: number
  specs: string
  // acceptedProvider: string | null
  acceptedMachine: Machine | null
  startAt: Date | null
  expiredAt: Date | null
  lastPaidAt: Date | null
  transactionHash: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ClusterStats {
  totalClusters: number
  activeNodes: number
  cpuUsage: number
  alerts: number
}

export interface ResourceUsage {
  cpu: number
  memory: number
  storage: number
} 