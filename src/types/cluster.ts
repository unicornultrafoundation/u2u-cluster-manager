export interface Cluster {
  id: string
  name: string
  status: 'active' | 'inactive' | 'pending' | 'error'
  nodes: number
  region?: string
  version?: string
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