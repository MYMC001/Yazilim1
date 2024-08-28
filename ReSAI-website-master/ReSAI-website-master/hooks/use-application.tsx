import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Job } from '@/types';
import { AlertTriangle } from 'lucide-react';

interface JobsPage {
  items: Job[];
  addItem: (data: Job) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useApplication = create(
  persist<JobsPage>((set, get) => ({
  items: [],
  addItem: (data: Job) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((item) => item.id === data.id);
    
    if (existingItem) {
      return toast('You have already applied for this job.');
    }

    set({ items: [...get().items, data] });
    toast.success('Applied successfully to the job!!!');
  },
  removeItem: (id: string) => {
    set({ items: [...get().items.filter((item) => item.id !== id)] });
    toast.success('Application withdrawed successfully!!!');
  },
  removeAll: () => set({ items: [] }),
}), {
  name: 'application-storage',
  storage: createJSONStorage(() => localStorage)
}));

export default useApplication;
