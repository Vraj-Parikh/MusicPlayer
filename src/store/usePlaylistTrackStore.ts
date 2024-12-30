import { create } from "zustand";

type playlist = {
  name: string;
  tracks: string[];
};
type usePlaylistTrackStore = {
  playlists: playlist[];
  addTrackToPlaylist: (name: string, url: string) => void;
  removeTrackFromPlaylist: (name: string, url: string) => void;
  createPlaylist: (name: string) => void;
  deletePlaylist: (name: string) => void;
};
export const usePlaylistTrackStore = create<usePlaylistTrackStore>((set) => ({
  playlists: [
    { name: "Rap", tracks: [] },
    { name: "Pop", tracks: [] },
    { name: "Love", tracks: [] },
    { name: "Bollywood", tracks: [] },
  ],
  addTrackToPlaylist: (name: string, url: string) => {
    set((state) => {
      if (
        state.playlists.some(
          (playlist) => playlist.name === name && playlist.tracks.includes(url)
        )
      ) {
        console.warn(`Track already exists in playlist ${name}.`);
        return state;
      }
      return {
        playlists: state.playlists.map((item) =>
          item.name !== name ? item : { ...item, tracks: [...item.tracks, url] }
        ),
      };
    });
  },
  removeTrackFromPlaylist: (name: string, url: string) => {
    set((state) => ({
      playlists: state.playlists.map((item) =>
        item.name !== name
          ? item
          : { ...item, tracks: item.tracks.filter((val) => val !== url) }
      ),
    }));
  },
  createPlaylist: (name: string) => {
    set((state) => {
      if (state.playlists.some((playlist) => playlist.name === name)) {
        console.warn(`Playlist with name "${name}" already exists.`);
        return state;
      }
      return {
        playlists: [...state.playlists, { name: name, tracks: [] }],
      };
    });
  },
  deletePlaylist: (name: string) => {
    set((state) => ({
      playlists: state.playlists.filter((item) => item.name !== name),
    }));
  },
}));
