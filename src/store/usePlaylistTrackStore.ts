import { create } from "zustand";

type playlist = {
  name: string;
  tracks: string[];
};
type usePlaylistTrackStore = {
  playlists: playlist[];
  addTrackToPlaylist: (id: string) => void;
  removeTrackFromPlaylist: (id: string) => void;
  createPlaylist: (name: string) => void;
  deletePlaylist: (name: string) => void;
};
export const usePlaylistTrackStore = create<usePlaylistTrackStore>((set) => ({
  playlists: [],
  addTrackToPlaylist: () => {},
  removeTrackFromPlaylist: () => {},
  createPlaylist: (name: string) => {},
  deletePlaylist: (name: string) => {},
}));
