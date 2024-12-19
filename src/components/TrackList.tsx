import {
  FlatList,
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
} from "react-native";
import React, { useCallback } from "react";
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
type TrackListProps = {
  flatlistProps: Partial<FlatListProps<AddTrack>>;
  data: AddTrack[];
};
const TrackList = ({ data, flatlistProps }: TrackListProps) => {
  const activeTrack = useActiveTrack();
  const { playing } = useIsPlaying();
  const handleSongChange = useCallback(async (track: Track) => {
    try {
      // await TrackPlayer.skip(idx);
      await TrackPlayer.load(track);
      // console.log(await TrackPlayer.getActiveTrack());
      // await TrackPlayer.play();
    } catch (error: any) {
      console.log(error?.message);
    }
  }, []);
  return (
    <FlatList
      data={data}
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 170 }}
      renderItem={({ item }) => (
        <TouchableHighlight onPress={() => handleSongChange(item)}>
          <TrackListItem
            track={item}
            isActive={item.url === activeTrack?.url}
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
export default TrackList;
