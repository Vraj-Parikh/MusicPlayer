import { create } from "zustand";
import { AddTrack } from "react-native-track-player";
type musicStoreType = {
  localMusic: AddTrack[] | null;
  activeTrackIndex: number;
  setLocalMusic: (localMusic: AddTrack[] | null) => void;
  setActiveTrackIndex: (index: number) => void;
};
export const musicStore = create<musicStoreType>((set) => ({
  localMusic: null,
  activeTrackIndex: 0,
  setLocalMusic: (localMusic: AddTrack[] | null) => set({ localMusic }),
  setActiveTrackIndex: (index: number) => set({ activeTrackIndex: index }),
}));
