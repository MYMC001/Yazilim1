import { create } from 'zustand';

import { Job } from '@/types';

interface PreviewModalApplications {
  isOpen: boolean;
  data?: Job;
  onOpen: (data: Job) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalApplications>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: Job) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false }),
}));

export default usePreviewModal;
