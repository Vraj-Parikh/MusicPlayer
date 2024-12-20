import { create } from "zustand";
import { AddTrack, RepeatMode } from "react-native-track-player";
type musicStoreType = {
  localMusic: AddTrack[] | null;
  activeTrackIndex: number;
  storedRepeatMode: RepeatMode;
  setLocalMusic: (localMusic: AddTrack[] | null) => void;
  setActiveTrackIndex: (index: number) => void;
  setStoredRepeatMode: (val: RepeatMode) => void;
};
export const musicStore = create<musicStoreType>((set) => ({
  localMusic: null,
  activeTrackIndex: 0,
  storedRepeatMode: RepeatMode.Queue,
  setLocalMusic: (localMusic: AddTrack[] | null) => set({ localMusic }),
  setActiveTrackIndex: (index: number) => set({ activeTrackIndex: index }),
  setStoredRepeatMode: (val: RepeatMode) => set({ storedRepeatMode: val }),
}));
