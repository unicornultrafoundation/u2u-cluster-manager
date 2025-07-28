import { create } from "zustand";

type ModalType = "deposit" | "withdraw" | null;

interface GlobalModalStore {
  openModal: ModalType;
  open: (modal: ModalType) => void;
  close: () => void;
}

export const useGlobalStore = create<GlobalModalStore>((set) => ({
  openModal: null,
  open: (modal) => set({ openModal: modal }),
  close: () => set({ openModal: null }),
}));
