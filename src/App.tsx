import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import ClusterDashboard from '@/pages/ClusterDashboard'
import MyWallet from '@/pages/MyWallet'
import DePINHub from '@/pages/DePINHub'
import Login from './pages/Login'
import { useAccount } from 'wagmi'
import { useAuthStore } from '@/store/authStore'
// import 'remixicon/fonts/remixicon.css'
import '@/styles/globals.css'
import NewCluster from './pages/NewCluster'
import ClusterDetail from './pages/ClusterDetail'

function App() {
  const { address: wagmiAddress, isConnected: wagmiConnected } = useAccount()
  const { isConnected, isConnecting, address, completeConnection, reset } = useAuthStore()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isAppReady, setIsAppReady] = useState(false)

  // Handle app initialization and verify persisted auth state
  useEffect(() => {
    const initializeApp = async () => {
      // Give a moment for zustand persist to rehydrate
      await new Promise(resolve => setTimeout(resolve, 100))
      
      // If we have persisted auth state but wagmi is not connected, reset the auth store
      if (isConnected && address && !wagmiConnected) {
        console.log('🔄 Persisted auth state found but wagmi not connected, resetting...')
        reset()
      }
      
      setIsAppReady(true)
    }

    initializeApp()
  }, []) // Only run once on mount

  // Sync wagmi state with our auth store (only when wagmi is actually connected with address)
  useEffect(() => {
    if (!isAppReady) return // Don't sync until app is ready

    if (wagmiConnected && wagmiAddress && !isConnecting) {
      // Only complete connection if wagmi actually has an address
      if (!isConnected || address !== wagmiAddress) {
        console.log('🔄 Syncing wagmi state to auth store:', wagmiAddress)
        completeConnection(wagmiAddress)
      }
    } else if (!wagmiConnected && isConnected) {
      // Reset auth store if wagmi disconnected
      console.log('🔄 Wagmi disconnected, resetting auth store')
      reset()
    }
  }, [wagmiConnected, wagmiAddress, isConnecting, isConnected, address, completeConnection, reset, isAppReady])

  // Show loading while app initializes
  if (!isAppReady) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  // Show login if not connected according to our auth store
  if (!isConnected || !address) {
    return <Login />
  }

  // console.log('✅ User authenticated with address:', address)

  return (
    <Router>
      <div className="min-h-screen">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Mobile-only sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 transition-all duration-300">
          <Routes>
            <Route path="/" element={<ClusterDashboard />} />
            <Route path="/wallet" element={<MyWallet />} />
            <Route path="/depin-hub" element={<DePINHub />} />
            <Route path="/cluster/new" element={<NewCluster />} />
            <Route path="/cluster/:id" element={<ClusterDetail />} />
            {/* Catch all route - redirect to dashboard */}
            <Route path="*" element={<ClusterDashboard />} />
          </Routes>
        </main>
        <div className="self-stretch w-full py-6 border-t border-gray-300 inline-flex justify-center items-center overflow-hidden">
          <div className="text-center justify-start text-neutral-600 text-sm font-normal font-['Figtree'] leading-normal">© 2025 U2U Network. All rights reserved.</div>
        </div>
      </div>
    </Router>
  )
}

export default App 