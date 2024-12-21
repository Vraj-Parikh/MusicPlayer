import { create } from "zustand";

type useFavoritesTrackStore = {
  favoritesTracksIds: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
};
export const useFavoritesTrackStore = create<useFavoritesTrackStore>((set) => ({
  favoritesTracksIds: [],
  addFavorite: (id: string) => {
    set((state) => ({ favoritesTracksIds: [...state.favoritesTracksIds, id] }));
  },
  removeFavorite: (id: string) => {
    set((state) => ({
      favoritesTracksIds: state.favoritesTracksIds.filter(
        (item) => item !== id
      ),
    }));
  },
}));
