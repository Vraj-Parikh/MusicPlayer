import { View } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles/default";
import { TSortBy } from "@/components/TrackList";
import { useMusicStore } from "@/store/useMusicStore";
import TrackListContainer from "@/components/TrackListContainer";
const Songs = () => {
  const { localMusic } = useMusicStore();

  if (!localMusic || localMusic.length === 0) {
    return <View style={defaultStyles.container}></View>;
  }
  const initialSortBy: TSortBy = {
    sortBy: "Recent",
    ascending: false,
  };
  return (
    <TrackListContainer
      id="3"
      initialSortBy={initialSortBy}
      data={localMusic}
    />
  );
};

export default Songs;
