import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, polygon, arbitrum, base } from '@reown/appkit/networks'
import { QueryClient } from '@tanstack/react-query'

// Get projectId from https://cloud.reown.com
const projectId = 'b58fec582d3d3a6cc6e161183a22be50' // You should replace this with your actual project ID

// Create a metadata object
const metadata = {
  name: 'U2U Cluster Manager',
  description: 'U2U Cluster Management Dashboard',
  url: 'https://u2u.network', // your dapp url
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Define U2U Network
const u2uNetwork = {
  id: 39, // U2U Subnet chain ID
  name: 'U2U Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'U2U',
    symbol: 'U2U',
  },
  rpcUrls: {
    default: { http: ['https://rpc-mainnet.u2u.xyz'] },
    public: { http: ['https://rpc-mainnet.u2u.xyz'] },
  },
  blockExplorers: {
    default: { name: 'U2UScan', url: 'https://u2uscan.xyz' },
  },
}

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks: [u2uNetwork, mainnet, polygon, arbitrum, base],
  projectId,
})

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: [u2uNetwork, mainnet, polygon, arbitrum, base],
  metadata,
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  }
})

export const config = wagmiAdapter.wagmiConfig

// Create a query client for React Query
export const queryClient = new QueryClient() 