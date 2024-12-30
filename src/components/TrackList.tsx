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
import {
  filterTracksByName,
  sortTracks,
} from "@/utility/ReactNativeTrackUtils";
import SongsPlayShuffleBtn from "./SongsPlayShuffleBtn";
import SortByBtn from "./SortByBtn";
import Loader from "./Loader";
import { useActiveQueueStore } from "@/store/useActiveQueue";

export type TSortBy = {
  sortBy: "Title" | "Duration" | "Recent";
  ascending: boolean;
};
type TrackListProps = {
  flatlistProps: Partial<FlatListProps<AddTrack>>;
  search: string;
  id: string;
  data: Track[];
  initialSortBy: TSortBy;
};
const TrackList = ({
  id,
  search,
  flatlistProps,
  data,
  initialSortBy,
}: TrackListProps) => {
  const activeTrack = useActiveTrack();
  const { playing } = useIsPlaying();
  const { activeQueue, setActiveQueue } = useActiveQueueStore();
  const [sortBy, setSortBy] = useState<TSortBy>(initialSortBy);

  const filteredSongs = useMemo(() => {
    let fileredTracks = data;
    if (search) {
      fileredTracks = filterTracksByName(search, data);
    }
    const sortedSongs = sortTracks(
      fileredTracks,
      sortBy.sortBy,
      sortBy.ascending
    );
    return sortedSongs;
  }, [search, data, sortBy]);
  useEffect(() => {
    if (activeQueue === null || activeQueue !== id) return;
    (async () => {
      try {
        let localSortedSongs = sortTracks(
          data || [],
          sortBy.sortBy,
          sortBy.ascending
        );
        await TrackPlayer.reset();
        await TrackPlayer.add(localSortedSongs);
        //TODO after clearing fetch current active track and play it
      } catch (error: any) {
        console.log(error?.message);
      }
    })();
    return () => {
      TrackPlayer.reset();
    };
  }, [sortBy]);
  const handleSongChange = async (selectedTrack: Track) => {
    try {
      if (!data || data.length === 0) return;
      const queueChanged = activeQueue !== id;
      if (activeQueue == null || queueChanged) {
        let localSortedSongs = sortTracks(
          data || [],
          sortBy.sortBy,
          sortBy.ascending
        );
        setActiveQueue(id);
        await TrackPlayer.reset();
        await TrackPlayer.add(localSortedSongs);
      }
      const trackId = (await TrackPlayer.getQueue()).findIndex(
        (track) => track.id === selectedTrack.id
      );
      if (trackId === -1) return;
      TrackPlayer.skip(trackId);
      if (playing) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  // if (loading) {
  //   return <Loader />;
  // }
  return (
    <>
      {filteredSongs && filteredSongs.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 5,
            alignItems: "center",
            paddingLeft: 5,
            marginTop: 20,
          }}
        >
          <SortByBtn setSortBy={setSortBy} sortBy={sortBy} />
          <SongsPlayShuffleBtn
            trackLength={filteredSongs.length}
            id={id}
            setSortBy={setSortBy}
          />
        </View>
      )}
      <FlatList
        data={filteredSongs}
        extraData={filteredSongs}
        contentContainerStyle={{
          paddingTop: 15,
          paddingBottom: activeTrack ? 170 : 110,
        }}
        renderItem={({ item: track }) => (
          <TouchableHighlight onPress={() => handleSongChange(track)}>
            <TrackListItem
              track={track}
              isActive={id === activeQueue && track.url === activeTrack?.url}
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
