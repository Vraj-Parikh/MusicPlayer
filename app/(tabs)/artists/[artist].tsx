import React from "react";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import TrackListContainer from "@/components/TrackListContainer";
import { TSortBy } from "@/components/TrackList";
import { useMusicStore } from "@/store/useMusicStore";

const SongsByArtist = () => {
  const { artist: artistName } = useLocalSearchParams<{ artist: string }>();
  const { localMusic } = useMusicStore();
  if (!artistName || !localMusic) {
    return <></>;
  }
  const initialSortBy: TSortBy = {
    sortBy: "Recent",
    ascending: false,
  };
  const filterSongsByArtist = localMusic.filter(
    (track) => track.artist === artistName
  );
  return (
    <TrackListContainer
      id="4"
      initialSortBy={initialSortBy}
      data={filterSongsByArtist}
      title={`Tracks By ${artistName}`}
      showbackButton={true}
    />
  );
};

export default SongsByArtist;
