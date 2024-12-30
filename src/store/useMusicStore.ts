import { create } from "zustand";
import { AddTrack, RepeatMode } from "react-native-track-player";
type useMusicStoreType = {
  localMusic: AddTrack[] | null;
  setLocalMusic: (localMusic: AddTrack[] | null) => void;
  storedRepeatMode: RepeatMode;
  setStoredRepeatMode: (val: RepeatMode) => void;
};
export const useMusicStore = create<useMusicStoreType>((set) => ({
  localMusic: null,
  setLocalMusic: (localMusic: AddTrack[] | null) => set({ localMusic }),
  storedRepeatMode: RepeatMode.Queue,
  setStoredRepeatMode: (val: RepeatMode) => set({ storedRepeatMode: val }),
}));
