import { View, Text, StyleSheet } from "react-native";
import { defaultStyles } from "@/styles/default";
import { SafeAreaView } from "react-native-safe-area-context";
import { useActiveTrack } from "react-native-track-player";
import FastImage from "react-native-fast-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FallBackArtworkUri } from "@/constants/images";
import { colors, fontSize } from "@/constants/constant";
import PlayerRepeatMode from "@/components/player/PlayerRepeatMode";
import VolumeBar from "@/components/player/VolumeBar";
import ControlCenter from "@/components/player/ControlCenter";
import ProgressBar from "@/components/player/ProgressBar";
import React from "react";

const player = () => {
  const activeTrack = useActiveTrack();
  const isFavourite = false;
  if (!activeTrack) {
    return <></>;
  }

  return (
    <SafeAreaView style={[defaultStyles.container, style.container]}>
      <FastImage
        source={{
          uri: activeTrack.artwork || FallBackArtworkUri,
          priority: FastImage.priority.high,
        }}
        style={style.img}
      />
      <View style={style.titleContainer}>
        <Text numberOfLines={1} style={style.titleText}>
          {activeTrack.title}
        </Text>
        <Ionicons
          name={isFavourite ? "heart" : "heart-outline"}
          size={24}
          color={isFavourite ? "red" : colors.textMuted}
        />
      </View>
      <Text numberOfLines={1} style={style.artistText}>
        {activeTrack.artist || "<unknown>"}
      </Text>
      <ProgressBar />
      <ControlCenter />
      <VolumeBar />
      <PlayerRepeatMode />
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  titleText: {
    color: colors.text,
    flex: 1,
    fontWeight: "bold",
    fontSize: fontSize.base,
  },
  artistText: {
    color: colors.text,
    fontSize: fontSize.xs,
    marginBottom: 40,
  },
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 30,
  },
  img: {
    width: "100%",
    height: "45%",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.textMuted,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
    marginTop: "auto",
  },
});

export default player;
