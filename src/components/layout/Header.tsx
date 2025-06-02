import React from "react";
import { Menu, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppKit } from '@reown/appkit/react'
import { useAuthStore } from '@/store/authStore'
import { Button } from "@/components/ui/button";
import U2U_LOGO from "@/assets/logo.png";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { open } = useAppKit()
  const { isConnected, address } = useAuthStore()

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const handleConnectWallet = () => {
    open()
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <header className="w-full px-4 tablet:px-8 desktop:px-6 py-3 relative bg-zinc-900 backdrop-blur-xl flex justify-center items-center overflow-hidden sticky top-0 z-40">
      {/* Background blur gradient */}
      <div className="w-full mobile:w-96 tablet:w-[1024px] desktop:w-[1440px] h-20 left-0 top-0 absolute overflow-hidden">
        <div className="w-60 h-20 left-[802px] tablet:left-[394px] desktop:left-[602px] top-[-69px] absolute bg-gradient-to-r from-emerald-400 to-violet-600 rounded-full blur-[121.21px]" />
      </div>

      {/* Header content container */}
      <div className="max-tablet:flex-1 tablet:w-full desktop:w-[1200px] flex justify-between items-center relative z-10">
        
        {/* Left section */}
        <div className="flex justify-start items-center">
          {/* Logo section */}
          <div className="pr-6 tablet:border-r desktop:border-r border-neutral-700 flex justify-start items-center gap-6 overflow-hidden">
            <div className="w-36 tablet:w-40 desktop:w-40 h-8 tablet:h-9 desktop:h-9 flex justify-start items-center gap-2 tablet:gap-2.5 desktop:gap-2.5">
              <Link to="/" className="flex items-center gap-2">
                <img src={U2U_LOGO} alt="U2U Logo" className="w-[167px] h-[36px]" />
              </Link>
            </div>
          </div>

          {/* Navigation - Hidden on mobile */}
          <nav className="hidden tablet:flex justify-center items-center">
            <div className="flex justify-center items-center">
              {/* Cluster Dashboard */}
              <div className="px-4 tablet:px-4 desktop:px-6 py-2 tablet:py-2 desktop:py-2 flex justify-center items-center overflow-hidden">
                <Link 
                  to="/" 
                  className={`text-center justify-center text-sm tablet:text-sm desktop:text-base font-medium font-inter-tight leading-normal tracking-wide hover:text-white transition-colors ${
                    isActiveRoute('/') ? 'text-white' : 'text-neutral-400'
                  }`}
                >
                  Cluster Dashboard
                </Link>
              </div>

              {/* My Wallet */}
              <div className="px-4 tablet:px-4 desktop:px-6 py-2 tablet:py-2 desktop:py-2 flex justify-center items-center overflow-hidden">
                <Link 
                  to="/wallet" 
                  className={`text-center justify-center text-sm tablet:text-sm desktop:text-base font-medium font-inter-tight leading-normal tracking-wide hover:text-white transition-colors ${
                    isActiveRoute('/wallet') ? 'text-white' : 'text-neutral-400'
                  }`}
                >
                  My Wallet
                </Link>
              </div>

              {/* U2U DePIN Client Hub */}
              <div className="px-4 tablet:px-4 desktop:px-6 py-2 tablet:py-2 desktop:py-2 flex justify-center items-center gap-2 overflow-hidden">
                <Link 
                  to="/depin-hub" 
                  className={`text-center justify-center text-sm tablet:text-sm desktop:text-base font-medium font-inter-tight leading-normal tracking-wide hover:text-white transition-colors ${
                    isActiveRoute('/depin-hub') ? 'text-white' : 'text-neutral-400'
                  }`}
                >
                  U2U DePIN Client Hub
                </Link>
                <ExternalLink className="w-6 h-6 text-neutral-400" strokeWidth={2.25} />
              </div>
            </div>
          </nav>
        </div>

        {/* Right section */}
        <div className="flex-1 flex justify-end items-center gap-2 tablet:gap-4 desktop:gap-4">
          {/* Connect Wallet Button - Hidden on mobile */}
          <Button
            onClick={handleConnectWallet}
            className="hidden tablet:flex px-4 py-2 tablet:py-2 desktop:py-3 bg-zinc-900 rounded-lg tablet:rounded-lg desktop:rounded-xl border-2 border-emerald-400 justify-center items-center gap-2 overflow-hidden hover:opacity-90 transition-opacity"
            style={{
              background: 'linear-gradient(135deg, #33CC99 0%, #714CF9 100%)',
            }}
          >
            <span className="text-center justify-center text-white text-sm tablet:text-sm desktop:text-base font-semibold font-inter-tight leading-normal tracking-wide">
              {isConnected && address ? formatAddress(address) : 'Connect Wallet'}
            </span>
          </Button>

          {/* Mobile menu button - Only visible on mobile */}
          <div className="tablet:hidden w-10 h-10 flex justify-center items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-6 h-6 relative"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-neutral-400" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
};

export default Header;
