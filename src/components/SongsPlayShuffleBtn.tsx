import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, fontSize } from "@/constants/constant";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
type SongsPlayShuffleBtnProps = {
  trackLength: number;
};
const SongsPlayShuffleBtn = ({ trackLength }: SongsPlayShuffleBtnProps) => {
  const { playing } = useIsPlaying();
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
      const randomIdx = Math.floor(Math.random() * trackLength);
      TrackPlayer.skip(randomIdx);
      TrackPlayer.play();
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  return (
    <View style={style.container}>
      <CustomButton
        style={style.btnContainer}
        onPress={playing ? onPressPause : onPressPlay}
      >
        <>
          <Ionicons
            name={playing ? "pause" : "play"}
            size={20}
            color={colors.primary}
          />
          <Text style={style.text}>{playing ? "Pause" : "Play"}</Text>
        </>
      </CustomButton>
      <CustomButton style={style.btnContainer} onPress={onPressShuffle}>
        <>
          <Ionicons name="shuffle-outline" size={20} color={colors.primary} />
          <Text style={style.text}>Shuffle</Text>
        </>
      </CustomButton>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    // marginTop: 20,
    borderWidth: 2,
    // height: "100%",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgGrey,
    gap: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 10,
  },
  text: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: fontSize.xxs,
  },
});
export default SongsPlayShuffleBtn;
