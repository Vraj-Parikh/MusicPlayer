import { View, Text } from "react-native";
import React from "react";
import { useSearchParams } from "expo-router/build/hooks";
import { usePlaylistTrackStore } from "@/store/usePlaylistTrackStore";
import TrackListContainer from "@/components/TrackListContainer";
import { useMusicStore } from "@/store/useMusicStore";
import { TSortBy } from "@/components/TrackList";

const PlaylistSongs = () => {
  const { localMusic } = useMusicStore();
  const { playlists } = usePlaylistTrackStore();
  const searchParams = useSearchParams();
  const playListName = searchParams.get("playlist");
  const selectedPlaylist = playlists.find(
    (playlist) => playlist.name === playListName
  );
  let playListTrackIds: string[] = [];
  if (selectedPlaylist) {
    playListTrackIds = selectedPlaylist.tracks;
  }
  const filteredTracks = localMusic?.filter((track) =>
    playListTrackIds.includes(track.id)
  );
  const initialSortBy: TSortBy = {
    sortBy: "Recent",
    ascending: false,
  };
  return (
    <TrackListContainer
      id="2"
      initialSortBy={initialSortBy}
      data={filteredTracks || []}
    />
  );
};

export default PlaylistSongs;
