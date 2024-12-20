import { View, Text } from "react-native";
import React from "react";
import TrackPlayer, { useIsPlaying } from "react-native-track-player";
import * as Haptics from "expo-haptics";
import CustomButton from "../CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, fontSize } from "@/constants/constant";
import { StyleSheet } from "react-native";
const ControlCenter = () => {
  const { playing } = useIsPlaying();
  return (
    <View style={style.controlContainer}>
      <CustomButton
        hapticType={Haptics.NotificationFeedbackType.Success}
        onPress={() => TrackPlayer.skipToPrevious()}
      >
        <Ionicons name="play-back" size={30} color="#fff" />
      </CustomButton>
      <CustomButton
        hapticType={Haptics.NotificationFeedbackType.Success}
        onPress={() => {
          playing ? TrackPlayer.stop() : TrackPlayer.play();
        }}
      >
        <Ionicons name={playing ? "pause" : "play"} size={55} color="#fff" />
      </CustomButton>
      <CustomButton
        hapticType={Haptics.NotificationFeedbackType.Success}
        onPress={() => TrackPlayer.skipToNext()}
      >
        <Ionicons name="play-forward" size={30} color="#fff" />
      </CustomButton>
    </View>
  );
};
const style = StyleSheet.create({
  controlContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    marginTop: 10,
    marginBottom: 40,
  },
});

export default React.memo(ControlCenter);
