import React from 'react'
import { RiHome3Line, RiWalletLine, RiArrowDownSLine, RiExternalLinkLine, RiCheckboxCircleLine, RiLogoutBoxRLine } from '@remixicon/react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import U2ULogo from '@/assets/u2u_logo.png'
import { useAuthStore } from '@/store/authStore'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { NavigationItem } from '@/types'
import { useDisconnect } from "@reown/appkit/react";

const navigation: NavigationItem[] = [
  { name: 'Overview', href: '/', icon: RiHome3Line, current: false },
  { name: 'My Wallet', href: '/wallet', icon: RiWalletLine, current: false },
  // { name: 'DePIN Hub', href: '/depin-hub', icon: Server, current: false },
  // { name: 'Monitoring', href: '/monitoring', icon: Activity, current: false },
  // { name: 'Security', href: '/security', icon: Shield, current: false },
  // { name: 'Settings', href: '/settings', icon: Settings, current: false },
]

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()
  const { address, disconnect } = useAuthStore()
  const { disconnect: appkitDisconnect } = useDisconnect()

  const isActiveRoute = (href: string) => {
    return location.pathname === href
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <>
      {/* Mobile backdrop - only visible on mobile */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/70 transition-opacity tablet:hidden",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile sidebar - slides from top */}
      <aside
        className={cn(
          "fixed left-0 right-0 z-40 max-h-[calc(100vh-4rem)] transform bg-zinc-900 backdrop-blur-xl transition-all duration-200 ease-in-out tablet:hidden overflow-hidden",
          sidebarOpen 
            ? "top-16 translate-y-0 opacity-100 pointer-events-auto" 
            : "top-0 -translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="w-full px-4 pt-3 pb-6 bg-zinc-900 backdrop-blur-xl flex flex-col justify-start items-start gap-6 max-h-[70vh] overflow-y-auto">
          {/* Navigation */}
          <div className="self-stretch flex flex-col justify-center items-start">
            {navigation.map((item) => {
              const isActive = isActiveRoute(item.href)
              const isDePINHub = item.href === '/depin-hub'
              
              return (
                <div key={item.name} className="self-stretch py-3 flex justify-start items-center gap-2 overflow-hidden">
                  <Link
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="flex-1 flex items-center gap-2"
                  >
                    <div className={cn(
                      "text-center justify-center text-base font-medium font-inter-tight leading-normal tracking-wide",
                      isActive ? "text-white" : "text-neutral-400"
                    )}>
                      {item.name}
                    </div>
                    {isDePINHub && (
                      <RiExternalLinkLine className="w-6 h-6 text-neutral-400" />
                    )}
                  </Link>
                </div>
              )
            })}
          </div>

          {/* Wallet Connection Section */}
          {address && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className='w-full'>
                <div className="self-stretch px-4 py-3 outline outline-1 outline-offset-[-1px] outline-neutral-700 flex justify-between items-center overflow-hidden">
                  <div className="flex-1 flex justify-start items-center gap-3">
                    <div className="w-6 h-6 relative rounded-md overflow-hidden bg-transparent flex items-center justify-center">
                      <img src={U2ULogo} alt="U2U Logo" className="w-6 h-6" />
                    </div>
                    <div className="text-center justify-center text-white text-sm font-semibold font-inter-tight leading-normal tracking-wide">
                      {formatAddress(address)}
                    </div>
                  </div>
                  <div className="w-6 h-6 relative overflow-hidden flex items-center justify-center">
                    <RiArrowDownSLine className="w-6 h-6 text-neutral-400" />
                  </div>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] rounded-none" align="start">
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <RiExternalLinkLine className="w-4 h-4" />
                    <span>U2U Explorer</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <RiCheckboxCircleLine className="w-4 h-4" />
                    <span>Copy Address</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={async () => {
                  await appkitDisconnect();
                  disconnect();
                  setSidebarOpen(false);
                }}>
                  <div className="flex items-center gap-2">
                    <RiLogoutBoxRLine className="w-4 h-4" />
                    <span>Disconnect</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </aside>
    </>
  )
}

export default Sidebar 