import React, { useState, useEffect } from 'react';
import { useAppKitWallet, Wallet } from "@reown/appkit-wallet-button/react";
import { useAccount } from 'wagmi';
import { useAuthStore } from '@/store/authStore';
import METAMASK_ICON from '@/assets/wallet/metamask.png'
import WALLET_CONNECT_ICON from '@/assets/wallet/wallet_connect.png'
import U2U_ICON from '@/assets/wallet/u2u_wallet.png'
import BG_DESKTOP from '@/assets/login_page/bg_desktop.png'
import BG_TABLET from '@/assets/login_page/bg_tablet.png'
import DEFIO_LOGO from '@/assets/logo.png'

const Login: React.FC = () => {
  const [connectingWallet, setConnectingWallet] = useState<string>('')
  const { address: wagmiAddress, isConnected: wagmiConnected } = useAccount()
  
  // Use our custom auth store
  const { 
    isConnecting, 
    isConnected, 
    address,
    startConnection, 
    completeConnection, 
    failConnection 
  } = useAuthStore()

  const { connect } = useAppKitWallet({
    onSuccess(parsedCaipAddress) {
      console.log('🎉 AppKit wallet connected:', parsedCaipAddress)
      // Don't complete connection here - let the wagmi sync handle it
    },
    onError(error) {
      console.error('💥 AppKit wallet connection error:', error)
      failConnection()
      setConnectingWallet('')
    }
  })

  // Monitor wagmi state changes and complete connection when ready
  useEffect(() => {
    if (isConnecting && wagmiConnected && wagmiAddress) {
      console.log('🔄 Wagmi connected, completing auth store connection...')
      setTimeout(() => {
        completeConnection(wagmiAddress)
      }, 1500)
      setConnectingWallet('')
    }
  }, [isConnecting, wagmiConnected, wagmiAddress, completeConnection])

  const handleWalletConnect = async (walletType: string, displayName: string) => {
    try {
      console.log(`🚀 Starting connection for ${displayName}...`)
      startConnection()
      setConnectingWallet(displayName)
      await connect(walletType as Wallet)
    } catch (error) {
      console.error('💥 Connection failed:', error)
      failConnection()
      setConnectingWallet('')
    }
  }

  // Show success screen if connected
  if (isConnected && address) {
  return (
      <div className="w-full h-screen relative bg-zinc-900 flex flex-col justify-center items-center overflow-hidden">
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
    <div className="w-full h-screen relative bg-zinc-900 flex flex-col justify-center tablet:justify-center desktop:justify-center items-center overflow-hidden">
      {/* Background */}
      <div className="w-full h-full left-0 top-0 absolute bg-neutral-900 overflow-hidden">
        {/* Background Images */}
        <img
          className="hidden desktop:block w-screen h-screen absolute origin-top-left"
          src={BG_DESKTOP}
          alt="Desktop Background"
        />
        <img
          className="hidden tablet:block desktop:hidden w-screen h-screen absolute origin-top-left"
          src={BG_TABLET}
          alt="Tablet Background"
        />
        
        {/* Gradient Blur */}
        <div className="w-[800px] tablet:w-[1200px] desktop:w-[1600px] h-[400px] tablet:h-[600px] desktop:h-[800px] left-1/2 top-3/4 transform -translate-x-1/2 -translate-y-1/2 absolute opacity-40 bg-violet-600 rounded-full blur-[100px] tablet:blur-[150px] desktop:blur-[200px]" />
        <div className="w-full h-full left-0 top-0 absolute bg-neutral-900/50" />
      </div>

      {/* Main Content */}
      <div className="self-stretch flex-1 px-4 tablet:px-0 desktop:px-0 flex flex-col justify-center items-center relative z-10">
        <div className="w-full tablet:w-[560px] desktop:w-[560px] bg-white rounded-xl tablet:rounded-xl desktop:rounded-2xl flex flex-col justify-start items-start overflow-hidden">
          {/* Header */}
          <img src={DEFIO_LOGO} />
          <div className="self-stretch p-4 tablet:p-6 desktop:p-6 flex justify-start items-center overflow-hidden">
            <div className="text-zinc-900 text-xl tablet:text-2xl desktop:text-2xl font-semibold font-title leading-loose">
              Log In With Wallet
            </div>
          </div>

          {/* Wallet Options */}
          <div className="self-stretch px-4 tablet:px-6 desktop:px-6 py-2 flex flex-col justify-start items-start gap-4 overflow-hidden">
            {/* U2U Wallet */}
            <button 
              onClick={() => handleWalletConnect('metamask', 'U2U Wallet')}
              disabled={isConnecting}
              className={`self-stretch p-3 tablet:p-4 desktop:p-4 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-start items-center gap-2 overflow-hidden transition-colors ${
                isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <div className="w-6 h-6 relative rounded-md overflow-hidden">
                <img src={U2U_ICON} alt="U2U Wallet" className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left text-zinc-900 text-sm tablet:text-base desktop:text-base font-medium leading-normal tracking-wide">
                {isConnecting && connectingWallet === 'U2U Wallet' ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                    Connecting...
                  </div>
                ) : (
                  'U2U Wallet'
                )}
              </div>
            </button>

            {/* Metamask */}
            <button 
              onClick={() => handleWalletConnect('metamask', 'Metamask')}
              disabled={isConnecting}
              className={`self-stretch p-3 tablet:p-4 desktop:p-4 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-start items-center gap-2 overflow-hidden transition-colors ${
                isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <div className="w-6 h-6 relative overflow-hidden">
                <img src={METAMASK_ICON} alt="Metamask" className="w-6 h-6" />
              </div>
              <div className="text-zinc-900 text-sm tablet:text-base desktop:text-base font-medium leading-normal tracking-wide">
                {isConnecting && connectingWallet === 'Metamask' ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                    Connecting...
                  </div>
                ) : (
                  'Metamask'
                )}
              </div>
            </button>

            {/* Wallet Connect */}
            <button 
              onClick={() => handleWalletConnect('walletConnect', 'Wallet Connect')}
              disabled={isConnecting}
              className={`self-stretch p-3 tablet:p-4 desktop:p-4 rounded-xl outline outline-1 outline-offset-[-1px] outline-zinc-300 flex justify-start items-center gap-2 overflow-hidden transition-colors ${
                isConnecting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 cursor-pointer'
              }`}
            >
              <div className="w-6 h-6 relative overflow-hidden">
                <img src={WALLET_CONNECT_ICON} alt="Wallet Connect" className="w-6 h-6" />
              </div>
              <div className="text-zinc-900 text-sm tablet:text-base desktop:text-base font-medium leading-normal tracking-wide">
                {isConnecting && connectingWallet === 'Wallet Connect' ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin"></div>
                    Connecting...
                  </div>
                ) : (
                  'Wallet Connect'
                )}
              </div>
            </button>
          </div>

          {/* Privacy Policy */}
          <div className="self-stretch p-4 tablet:p-6 desktop:p-6 flex justify-between items-center overflow-hidden">
            <div className="flex-1">
              <span className="text-neutral-400 text-xs tablet:text-sm desktop:text-sm font-normal leading-tight tablet:leading-normal desktop:leading-normal tracking-wide">
                By connecting your wallet, you acknowledge and agree to our{" "}
              </span>
              <span className="text-zinc-900 text-xs tablet:text-sm desktop:text-sm font-medium leading-tight tablet:leading-normal desktop:leading-normal tracking-wide">
                Privacy Policy
              </span>
              <span className="text-neutral-400 text-xs tablet:text-sm desktop:text-sm font-normal leading-tight tablet:leading-normal desktop:leading-normal tracking-wide">
                {" "}and{" "}
              </span>
              <span className="text-zinc-900 text-xs tablet:text-sm desktop:text-sm font-medium leading-tight tablet:leading-normal desktop:leading-normal tracking-wide">
                Terms of Service
              </span>
              <span className="text-neutral-400 text-xs tablet:text-sm desktop:text-sm font-normal leading-tight tablet:leading-normal desktop:leading-normal tracking-wide">
                .
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="self-stretch py-6 flex justify-center items-center overflow-hidden relative z-10">
        <div className="text-center text-neutral-400 text-sm font-normal font-inter-tight leading-normal tracking-wide">
          © 2025 U2U Network. All rights reserved.
        </div>
      </div> */}
    </div>
  );
};

export default Login;
