import { create } from "zustand";
import { AddTrack, RepeatMode } from "react-native-track-player";
type musicStoreType = {
  localMusic: AddTrack[] | null;
  setLocalMusic: (localMusic: AddTrack[] | null) => void;
  activeTrackUrl: string | null;
  setActiveTrackUrl: (url: string) => void;
  storedRepeatMode: RepeatMode;
  setStoredRepeatMode: (val: RepeatMode) => void;
  favoriteSongs: Array<string>;
  addTofavoriteSongs: (id: string) => void;
};
export const musicStore = create<musicStoreType>((set, get) => ({
  localMusic: null,
  setLocalMusic: (localMusic: AddTrack[] | null) => set({ localMusic }),
  activeTrackUrl: null,
  setActiveTrackUrl: (url: string) => set({ activeTrackUrl: url }),
  storedRepeatMode: RepeatMode.Queue,
  setStoredRepeatMode: (val: RepeatMode) => set({ storedRepeatMode: val }),
  favoriteSongs: [],
  addTofavoriteSongs: (id: string) =>
    set((state) => ({ favoriteSongs: [id, ...state.favoriteSongs] })),
}));
