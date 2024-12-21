import { create } from "zustand";

type activeTrackStoreType = {
  activeTrackUrl: string | null;
  setActiveTrackUrl: (url: string) => void;
};
export const useActiveTrackStore = create<activeTrackStoreType>((set) => ({
  activeTrackUrl: null,
  setActiveTrackUrl: (url: string) => set({ activeTrackUrl: url }),
}));
