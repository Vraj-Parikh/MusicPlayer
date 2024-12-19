import { View, ScrollView, Text } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { defaultStyles } from "@/styles/default";
import TrackList from "@/components/TrackList";
import { colors, screenPadding } from "@/constants/constant";
import CustomTextInput from "@/components/CustomTextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { musicStore } from "@/store/musicStore";
import { filterTracksByTitle } from "@/utility/ReactNativeTrackUtils";
import { SplashScreen } from "expo-router";
import useSetupTrackPlayer from "@/hooks/useSetupTrackPlayer";
import useLocalMusic from "@/hooks/useLocalMusic";
import TrackPlayer, { useActiveTrack } from "react-native-track-player";
import FloatingPlayer from "@/components/FloatingPlayer";
// SplashScreen.preventAutoHideAsync();
const Songs = () => {
  useLocalMusic();
  const [search, setSearch] = useState("");
  const { localMusic, activeTrackIndex } = musicStore();
  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);
  // useSetupTrackPlayer({
  //   onLoad: handleTrackPlayerLoaded,
  // });
  useEffect(() => {
    if (!localMusic) return;
    (async () => {
      try {
        await TrackPlayer.add(localMusic);
        // await TrackPlayer.play();
        // await TrackPlayer.pause();
        // await TrackPlayer.skip(activeTrackIndex);
      } catch (error: any) {
        console.log(error);
      }
    })();
  }, []);
  const filteredSongs = useMemo(
    () => (search ? filterTracksByTitle(search, localMusic) : localMusic),
    [search, localMusic]
  );
  if (!localMusic || localMusic.length === 0) {
    return <View style={defaultStyles.container}></View>;
  }

  return (
    <View
      style={{
        ...defaultStyles.container,
        paddingLeft: screenPadding.horizontal,
        paddingRight: screenPadding.horizontal,
        position: "relative",
      }}
    >
      {/* TODO Why use scrollview? */}
      <CustomTextInput
        placeholder="Search Songs"
        leftIcon={<Ionicons name="search" size={24} color={colors.primary} />}
        value={search}
        setValue={setSearch}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {filteredSongs && (
          <TrackList
            flatlistProps={{
              scrollEnabled: false,
            }}
            data={filteredSongs}
          />
        )}
      </ScrollView>
      {/* <FloatingPlayer /> */}
    </View>
  );
};

export default Songs;
