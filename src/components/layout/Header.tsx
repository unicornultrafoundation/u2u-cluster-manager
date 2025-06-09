import React, { useEffect, useState } from "react";
import { RiArrowDownSFill, RiSunFill, RiMoonFill, RiMenuLine } from '@remixicon/react'
import { Link, useLocation } from "react-router-dom";
import { useAppKit } from '@reown/appkit/react'
import { useAuthStore } from '@/store/authStore'
import { Button } from "@/components/ui/button";
import U2U_LOGO from "@/assets/logo_text_white.png";
import U2U_TOKEN_ICON from '@/assets/wallet/u2u_wallet.png'

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { open } = useAppKit()
  const { isConnected, address } = useAuthStore()

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // On mount, check if dark mode is enabled
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      setIsDark(true);
    }
  };

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
    <header className="w-full px-4 tablet:px-8 desktop:px-6 py-3 bg-zinc-800 backdrop-blur-xl flex justify-center items-center overflow-hidden sticky top-0 z-40">
      {/* Background blur gradient */}
      <div className="w-full mobile:w-96 tablet:w-[1024px] desktop:w-[1440px] h-20 left-0 top-0 absolute overflow-hidden">
        <div className="w-60 h-20 left-[802px] tablet:left-[394px] desktop:left-[602px] top-[-69px] absolute bg-gradient-to-bl from-amber-300 to-emerald-500 rounded-full blur-[100px]" />
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
        </div>
        {/* Navigation - Hidden on mobile */}
        <nav className="hidden tablet:flex justify-center items-center absolute left-1/2 -translate-x-1/2">
          <div className="self-stretch inline-flex justify-center items-center gap-4 overflow-hidden">
            <Link
              to="/"
              className={`self-stretch px-4 py-2 ${isActiveRoute('/') && 'bg-zinc-800'} flex justify-center items-center gap-1 overflow-hidden ${
                isActiveRoute('/') ? 'text-white' : 'text-gray-500'
              }`}
            >
              <div className="text-center justify-center text-sm font-medium font-['Figtree'] leading-normal">
                Overview
              </div>
            </Link>
            <Link
              to="/wallet"
              className={`self-stretch px-4 py-2 ${isActiveRoute('/wallet') && 'bg-zinc-800'} flex justify-center items-center gap-1 overflow-hidden ${
                isActiveRoute('/wallet') ? 'text-white' : 'text-gray-500'
              }`}
            >
              <div className="text-center justify-cente text-sm font-medium font-['Figtree'] leading-normal">
                My Wallet
              </div>
            </Link>
          </div>
        </nav>

        {/* Right section */}
        <div className="flex-1 flex justify-end items-center gap-2 tablet:gap-4 desktop:gap-4">
          {/* Dark mode switch button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="flex items-center justify-center"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <RiSunFill className="w-5 h-5 text-yellow-400" />
            ) : (
              <RiMoonFill className="w-5 h-5 text-zinc-700" />
            )}
          </Button>

          
          {/* Connect Wallet Button - Hidden on mobile */}
          <Button
            onClick={handleConnectWallet}
            className="hidden tablet:flex px-3 py-2 bg-zinc-800 justify-start items-center gap-2 overflow-hidden hover:opacity-90 transition-opacity"
          >
            <div className="w-6 h-6 relative rounded-md overflow-hidden">
              <img src={U2U_TOKEN_ICON} alt="U2U Token" className="w-6 h-6" />
            </div>
            <span className="text-center justify-center text-white text-sm font-semibold font-inter-tight leading-normal tracking-wide">
              {isConnected && address ? formatAddress(address) : 'Connect Wallet'}
            </span>
            <div className="w-6 h-6 relative overflow-hidden">
              <RiArrowDownSFill className="w-5 h-5 text-white" />
            </div>
          </Button>
          {/* Mobile menu button - Only visible on mobile */}
          <div className="tablet:hidden w-10 h-10 flex justify-center items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-6 h-6 relative"
              aria-label="Toggle menu"
            >
              <RiMenuLine className="w-6 h-6 text-neutral-400" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
};

export default Header;
