import { View, Text } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles/default";
import { useMusicStore } from "@/store/useMusicStore";
import { useFavoritesTrackStore } from "@/store/useFavoritesTrackStore";
import { TSortBy } from "@/components/TrackList";
import TrackListContainer from "@/components/TrackListContainer";

const Favorites = () => {
  const { localMusic } = useMusicStore();
  const { favoritesTracksIds } = useFavoritesTrackStore();
  if (!localMusic) {
    return <></>;
  }
  const favoritesSongs = localMusic.filter((item) =>
    favoritesTracksIds.includes(item.id)
  );
  const initialSortBy: TSortBy = {
    sortBy: "Recent",
    ascending: false,
  };
  return (
    <TrackListContainer
      id="1"
      initialSortBy={initialSortBy}
      data={favoritesSongs}
    />
  );
};

export default Favorites;
