import type { RemixiconComponentType } from '@remixicon/react'

export interface NavigationItem {
  name: string
  href: string
  icon: RemixiconComponentType
  current: boolean
}

export interface StatCard {
  name: string
  value: string
  icon: RemixiconComponentType
  color: string
} 