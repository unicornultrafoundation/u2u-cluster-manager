import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthState {
  // Manual connection state tracking
  isConnecting: boolean
  isConnected: boolean
  address: string | null
  
  // Actions
  setConnecting: (connecting: boolean) => void
  setConnected: (connected: boolean, address?: string) => void
  setAddress: (address: string | null) => void
  reset: () => void
  disconnect: () => void
  
  // Connection flow methods
  startConnection: () => void
  completeConnection: (address: string) => void
  failConnection: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      isConnecting: false,
      isConnected: false,
      address: null,
      
      // Basic setters
      setConnecting: (connecting: boolean) => 
        set({ isConnecting: connecting }),
      
      setConnected: (connected: boolean, address?: string) => 
        set({ 
          isConnected: connected,
          address: address || null 
        }),
      
      setAddress: (address: string | null) => 
        set({ address }),
      
      reset: () => 
        set({ 
          isConnecting: false, 
          isConnected: false, 
          address: null 
        }),
      
      disconnect: () => {
        console.log('🔄 Disconnecting wallet...')
        set({ 
          isConnecting: false, 
          isConnected: false, 
          address: null 
        })
      },
      
      // Connection flow methods
      startConnection: () => {
        console.log('🔄 Starting wallet connection...')
        set({ 
          isConnecting: true, 
          isConnected: false, 
          address: null 
        })
      },
      
      completeConnection: (address: string) => {
        console.log('✅ Wallet connection completed:', address)
        set({ 
          isConnecting: false, 
          isConnected: true, 
          address 
        })
      },
      
      failConnection: () => {
        console.log('❌ Wallet connection failed')
        set({ 
          isConnecting: false, 
          isConnected: false, 
          address: null 
        })
      }
    }),
    {
      name: 'u2u-auth-store', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist these fields (exclude isConnecting for better UX)
        isConnected: state.isConnected,
        address: state.address,
      }),
    }
  )
) 