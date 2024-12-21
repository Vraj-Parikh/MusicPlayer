import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import FastImage from "react-native-fast-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, fontSize, screenPadding } from "@/constants/constant";
import { FallBackArtworkUri } from "@/constants/images";
import { router } from "expo-router";
const FloatingPlayer = () => {
  const [display, setDisplay] = useState<"none" | "flex">("flex");
  Keyboard.addListener("keyboardDidShow", () => {
    setDisplay("none");
  });
  Keyboard.addListener("keyboardDidHide", () => {
    setDisplay("flex");
  });
  const { playing } = useIsPlaying();
  const track = useActiveTrack();
  if (!track) {
    return <></>;
  }
  const handleOnPress = () => {
    router.push("/player");
  };
  //TODO 2:24:00
  return (
    <Pressable
      style={{
        ...style.container,
        display: display,
      }}
      onPress={handleOnPress}
    >
      <FastImage
        style={style.artworkImage}
        source={{
          uri: track.artwork || FallBackArtworkUri,
          priority: FastImage.priority.high,
        }}
      />
      <Text style={style.textTitle} numberOfLines={1}>
        {track?.title}
      </Text>
      <TouchableOpacity
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}
      >
        <Ionicons name={playing ? "pause" : "play"} size={30} color="#fff" />
      </TouchableOpacity>
    </Pressable>
  );
};

const style = StyleSheet.create({
  artworkImage: {
    width: 50,
    height: "100%",
    borderRadius: 20,
  },
  textTitle: {
    color: colors.text,
    fontSize: fontSize.xs,
    flex: 1,
    fontWeight: "bold",
  },
  container: {
    flexDirection: "row",
    position: "absolute",
    left: screenPadding.horizontal,
    right: screenPadding.horizontal,
    height: 55,
    bottom: 80,
    alignItems: "center",
    borderRadius: 40,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: colors.primary,
    gap: 10,
  },
});
export default FloatingPlayer;
