import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import { secondsToMmSs } from "@/utility/helper";
import TrackPlayer, { useProgress } from "react-native-track-player";
import { colors, fontSize } from "@/constants/constant";
import { StyleSheet } from "react-native";
const ProgressBar = () => {
  const { duration, position } = useProgress(250);
  const [showRemainingTime, setShowRemainingTime] = useState(false);
  const [time, setTime] = useState(position);
  const [isSliding, setIsSliding] = useState(false);
  useEffect(() => {
    if (isSliding) return;
    setTime(position);
  }, [position, isSliding]);
  return (
    <View>
      <Slider
        style={style.slider}
        minimumValue={0}
        value={time}
        maximumValue={duration}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.primary}
        thumbTintColor={colors.primary}
        step={1}
        onValueChange={async (value) => {
          setIsSliding(true);
          setTime(value);
        }}
        onSlidingComplete={(value) => {
          setTime(value);
          setIsSliding(false);
          TrackPlayer.seekTo(value);
        }}
      />
      <View style={style.timeContainer}>
        <Text style={style.trackTime}>{secondsToMmSs(time)}</Text>
        <Text
          style={style.trackTime}
          onPress={() => setShowRemainingTime(!showRemainingTime)}
        >
          {showRemainingTime
            ? `- ${secondsToMmSs(duration - time)}`
            : secondsToMmSs(duration)}
        </Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  trackTime: {
    color: colors.textMuted,
    fontSize: fontSize.xxs,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  slider: {
    width: "100%",
    height: 20,
  },
});
export default ProgressBar;
