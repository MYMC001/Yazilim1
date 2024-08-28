import { create } from 'zustand';

interface useSectorModalSector {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSectorModal = create<useSectorModalSector>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
