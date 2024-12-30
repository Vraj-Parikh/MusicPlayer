import React from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { usePlaylistTrackStore } from "@/store/usePlaylistTrackStore";
import TrackListContainer from "@/components/TrackListContainer";
import { useMusicStore } from "@/store/useMusicStore";
import { TSortBy } from "@/components/TrackList";

const PlaylistSongs = () => {
  const { playlist: playListName } = useLocalSearchParams<{
    playlist: string;
  }>();
  const { localMusic } = useMusicStore();
  const { playlists } = usePlaylistTrackStore();
  const selectedPlaylist = playlists.find(
    (playlist) => playlist.name === playListName
  );
  let playListTrackIds: string[] = [];
  if (selectedPlaylist) {
    playListTrackIds = selectedPlaylist.tracks;
  }
  const filteredTracks = localMusic?.filter((track) =>
    playListTrackIds.includes(track.url)
  );
  const initialSortBy: TSortBy = {
    sortBy: "Recent",
    ascending: false,
  };
  return (
    <TrackListContainer
      title={`Tracks In Playlist <${playListName}>`}
      id="2"
      initialSortBy={initialSortBy}
      data={filteredTracks || []}
      showbackButton={true}
    />
  );
};

export default PlaylistSongs;
