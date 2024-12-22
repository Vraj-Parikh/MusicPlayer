import { View, Text } from "react-native";
import React from "react";
import { useSearchParams } from "expo-router/build/hooks";
import TrackListContainer from "@/components/TrackListContainer";
import { TSortBy } from "@/components/TrackList";
import { useMusicStore } from "@/store/useMusicStore";

const SongsByArtist = () => {
  const searchParams = useSearchParams();
  const { localMusic } = useMusicStore();
  const artistName = searchParams.get("artist");
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
    />
  );
};

export default SongsByArtist;
