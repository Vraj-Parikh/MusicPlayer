import {
  FlatList,
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import TrackListItem from "./TrackListItem";
import { FlatListProps } from "react-native";
import TrackPlayer, {
  AddTrack,
  Track,
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import { colors, fontSize } from "@/constants/constant";
import FastImage from "react-native-fast-image";
import { FallBackArtworkUri } from "@/constants/images";
import { musicStore } from "@/store/musicStore";
import {
  filterTracksByName,
  sortTracks,
} from "@/utility/ReactNativeTrackUtils";
import SongsPlayShuffleBtn from "./SongsPlayShuffleBtn";
import SortByBtn from "./SortByBtn";

export type TSortBy = {
  sortBy: "Title" | "Duration" | "Recent";
  ascending: boolean;
};
type TrackListProps = {
  flatlistProps: Partial<FlatListProps<AddTrack>>;
  search: string;
  id: string;
};
const TrackList = ({ id, search, flatlistProps }: TrackListProps) => {
  const activeTrack = useActiveTrack();
  const { playing } = useIsPlaying();
  const { localMusic } = musicStore();
  const [sortBy, setSortBy] = useState<TSortBy>({
    sortBy: "Recent",
    ascending: false,
  });
  const [filteredSongs, setFilteredSongs] = useState<AddTrack[]>([]);
  const memoizedFilteredSongs = useMemo(
    () => (search ? filterTracksByName(search, localMusic) : localMusic || []),
    [search, localMusic]
  );
  useEffect(() => {
    const sortedSongs = sortTracks(
      memoizedFilteredSongs,
      sortBy.sortBy,
      sortBy.ascending
    );
    setFilteredSongs(sortedSongs);
  }, [search, sortBy, localMusic]);
  const handleSongChange = async (selectedTrack: Track) => {
    if (!localMusic || localMusic.length === 0) return;
    try {
      const trackId = localMusic.findIndex(
        (track) => track.url === selectedTrack.url
      );
      console.log(trackId);
      if (trackId === -1) return;
      TrackPlayer.skip(trackId);
      if (playing) {
        return await TrackPlayer.play();
      }
      await TrackPlayer.pause();
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  const onPressPlay = () => {
    try {
      TrackPlayer.play();
    } catch (error: any) {
      console.log(error);
    }
  };
  const onPressPause = () => {
    try {
      TrackPlayer.pause();
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  const onPressShuffle = () => {
    try {
      const randomIdx = Math.floor(Math.random() * filteredSongs.length);
      TrackPlayer.skip(randomIdx);
      TrackPlayer.play();
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  return (
    <>
      {filteredSongs && filteredSongs.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 5,
            alignItems: "center",
            paddingLeft: 10,
            marginTop: 20,
          }}
        >
          <SortByBtn setSortBy={setSortBy} sortBy={sortBy} />
          <SongsPlayShuffleBtn
            onPressPlay={onPressPlay}
            onPressShuffle={onPressShuffle}
            onPressPause={onPressPause}
          />
        </View>
      )}
      <FlatList
        data={filteredSongs}
        extraData={filteredSongs}
        contentContainerStyle={{ paddingTop: 15, paddingBottom: 170 }}
        renderItem={({ item: track }) => (
          <TouchableHighlight onPress={() => handleSongChange(track)}>
            <TrackListItem
              track={track}
              isActive={track.url === activeTrack?.url}
              isPlaying={playing}
            />
          </TouchableHighlight>
        )}
        ListEmptyComponent={
          <View style={style.emptyContainer}>
            <Text style={style.notFoundText}>No songs found</Text>
            <FastImage source={{ uri: FallBackArtworkUri }} style={style.img} />
          </View>
        }
        keyExtractor={(item, idx) => idx + String(item.artist)}
        {...flatlistProps}
      />
    </>
  );
};

const style = StyleSheet.create({
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    color: colors.text,
    textAlign: "center",
    marginTop: 10,
    fontSize: fontSize.sm,
  },
  img: {
    width: 100,
    height: 100,
    opacity: 0.25,
    alignSelf: "center",
    marginTop: 40,
  },
});
export default React.memo(TrackList);
