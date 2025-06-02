import { LucideIcon } from 'lucide-react'

export interface NavigationItem {
  name: string
  href: string
  icon: LucideIcon
  current: boolean
}

export interface StatCard {
  name: string
  value: string
  icon: LucideIcon
  color: string
} 