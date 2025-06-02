import { create } from 'zustand'
import type { Cluster } from '@/types'

interface ClusterStore {
  clusters: Cluster[]
  selectedCluster: Cluster | null
  isLoading: boolean
  error: string | null
  
  // Actions
  setClusters: (clusters: Cluster[]) => void
  selectCluster: (cluster: Cluster | null) => void
  addCluster: (cluster: Cluster) => void
  updateCluster: (id: string, updates: Partial<Cluster>) => void
  deleteCluster: (id: string) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

const useClusterStore = create<ClusterStore>((set) => ({
  clusters: [],
  selectedCluster: null,
  isLoading: false,
  error: null,
  
  // Actions
  setClusters: (clusters) => set({ clusters }),
  selectCluster: (cluster) => set({ selectedCluster: cluster }),
  addCluster: (cluster) => set((state) => ({ 
    clusters: [...state.clusters, cluster] 
  })),
  updateCluster: (id, updates) => set((state) => ({
    clusters: state.clusters.map(cluster => 
      cluster.id === id ? { ...cluster, ...updates } : cluster
    )
  })),
  deleteCluster: (id) => set((state) => ({
    clusters: state.clusters.filter(cluster => cluster.id !== id),
    selectedCluster: state.selectedCluster?.id === id ? null : state.selectedCluster
  })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}))

export default useClusterStore 