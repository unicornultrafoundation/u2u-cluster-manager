import { create } from 'zustand'

interface NetworkStore {
  showSwitchModal: boolean
  openSwitchModal: () => void
  closeSwitchModal: () => void
  onCancelSwitch?: () => void
  setOnCancelSwitch: (cb: () => void) => void
}

export const useNetworkStore = create<NetworkStore>((set) => ({
  showSwitchModal: false,
  openSwitchModal: () => set({ showSwitchModal: true }),
  closeSwitchModal: () => set({ showSwitchModal: false }),
  onCancelSwitch: undefined,
  setOnCancelSwitch: (cb) => set({ onCancelSwitch: cb }),
}))
