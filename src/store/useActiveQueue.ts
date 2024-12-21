import { create } from "zustand";

type activeTrackStoreType = {
  activeQueue: string | null;
  setActiveQueue: (url: string) => void;
};
export const useActiveQueueStore = create<activeTrackStoreType>((set) => ({
  activeQueue: null,
  setActiveQueue: (url: string) => set({ activeQueue: url }),
}));
