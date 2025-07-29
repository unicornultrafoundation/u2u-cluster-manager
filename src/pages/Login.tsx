import React, { useEffect, useState } from 'react'
import { useAppKitWallet, Wallet } from '@reown/appkit-wallet-button/react'
import { useAccount } from 'wagmi'
import { useAuthStore } from '@/store/authStore'
import { useNetworkStore } from '@/store/useNetworkStore'
import { SwitchNetworkModal } from '@/components/modal/SwitchNetworkModal'
import { u2uNetwork } from '@/config/wagmi'

import METAMASK_ICON from '@/assets/wallet/metamask.png'
import WALLET_CONNECT_ICON from '@/assets/wallet/wallet_connect.png'
import U2U_ICON from '@/assets/wallet/u2u_wallet.png'
import BG_DESKTOP from '@/assets/login_page/bg_desktop.png'
import BG_TABLET from '@/assets/login_page/bg_tablet.png'
import DEFIO_LOGO from '@/assets/logo.png'

const wallets = [
  { key: 'metamask', label: 'U2U Wallet', icon: U2U_ICON },
  { key: 'metamask', label: 'Metamask', icon: METAMASK_ICON },
  { key: 'walletConnect', label: 'Wallet Connect', icon: WALLET_CONNECT_ICON },
]

const Login: React.FC = () => {
  const [connectingWallet, setConnectingWallet] = useState<string>('')
  const { address: wagmiAddress, isConnected: wagmiConnected, chainId } = useAccount()
  const { openSwitchModal, setOnCancelSwitch } = useNetworkStore()
  
  const {
    isConnecting,
    isConnected,
    address,
    startConnection,
    completeConnection,
    failConnection,
  } = useAuthStore()
  
  const { connect } = useAppKitWallet({
    onSuccess: () => {},
    onError: (error) => {
      console.error('💥 AppKit wallet connection error:', error)
      failConnection()
      setConnectingWallet('')
    },
  })
  
  useEffect(() => {
    if (!isConnecting || !wagmiConnected || !wagmiAddress) return
    
    if (chainId === u2uNetwork.id) {
      completeConnection(wagmiAddress)
      setConnectingWallet('')
    } else {
      setOnCancelSwitch(() => {
        failConnection()
        setConnectingWallet('')
      })
      openSwitchModal()
    }
  }, [isConnecting, wagmiConnected, wagmiAddress, chainId])
  
  const handleWalletConnect = async (walletType: string, displayName: string) => {
    try {
      console.log(`🚀 Connecting to ${displayName}...`)
      startConnection()
      setConnectingWallet(displayName)
      await connect(walletType as Wallet)
    } catch (error) {
      console.error('💥 Connection failed:', error)
      failConnection()
      setConnectingWallet('')
    }
  }
  
  if (isConnected && address) {
    return (
      <div className="w-full h-screen bg-zinc-900 flex flex-col justify-center items-center overflow-hidden">
        <div className="text-white text-2xl font-semibold mb-4">Wallet Connected!</div>
        <div className="text-neutral-400 text-lg mb-6">
          Connected to {address.slice(0, 6)}...{address.slice(-4)}
        </div>
        <div className="text-neutral-400 text-lg mb-6">Loading your dashboard...</div>
        <div className="w-8 h-8 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }
  
  return (
    <div className="w-full h-screen relative bg-zinc-900 flex flex-col justify-center items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-neutral-900">
        <img className="hidden desktop:block w-full h-full absolute" src={BG_DESKTOP} alt="Desktop BG" />
        <img className="hidden tablet:block desktop:hidden w-full h-full absolute" src={BG_TABLET} alt="Tablet BG" />
        <div className="absolute left-1/2 top-3/4 transform -translate-x-1/2 -translate-y-1/2 w-[800px] tablet:w-[1200px] desktop:w-[1600px] h-[400px] tablet:h-[600px] desktop:h-[800px] opacity-40 bg-violet-600 rounded-full blur-[100px] tablet:blur-[150px] desktop:blur-[200px]" />
        <div className="absolute inset-0 bg-neutral-900/50" />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 w-full h-full tablet:h-auto tablet:max-w-[432px] desktop:max-w-[512px] bg-neutral-100 flex flex-col">
        <div className="p-4 tablet:p-6 w-full">
          <img className="h-8" src={DEFIO_LOGO} alt="logo" />
        </div>
        <div className="px-4 mt-6 tablet:mt-8 desktop:mt-10 tablet:px-6 mb-2">
          <div className="text-zinc-900 text-xl uppercase tablet:text-2xl font-title">sign in with wallet</div>
        </div>
        
        <div className="px-4 tablet:px-6 pb-6 flex flex-col gap-4">
          {wallets.map(({ key, label, icon }) => (
            <button
              key={key + label}
              onClick={() => handleWalletConnect(key, label)}
              disabled={isConnecting}
              className={`w-full p-4 bg-white flex items-center gap-2 transition-colors rounded ${
                isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <img src={icon} alt={label} className="w-6 h-6" />
              <span className="text-zinc-900 text-sm font-medium tracking-wide">
                {isConnecting && connectingWallet === label ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                    Connecting...
                  </div>
                ) : (
                  label
                )}
              </span>
            </button>
          ))}
        </div>
        
        <div className="px-4 tablet:px-6 pb-6 text-xs text-neutral-400">
          By connecting your wallet, you acknowledge and agree to our{' '}
          <span className="text-zinc-900 font-medium">Privacy Policy</span> and{' '}
          <span className="text-zinc-900 font-medium">Terms of Service</span>.
        </div>
      </div>
      <SwitchNetworkModal />
    </div>
  )
}

export default Login
