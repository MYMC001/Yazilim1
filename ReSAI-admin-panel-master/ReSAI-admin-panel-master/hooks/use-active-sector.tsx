import { create } from 'zustand';

interface useActiveSectorInterface {
  id?: string;
  set: (id: string) => void;
  reset: () => void;
}

export const useActiveSector = create<useActiveSectorInterface>((set) => ({
  id: undefined,
  set: (id: string) => set({ id }),
  reset: () => set({ id: undefined }),
}));
