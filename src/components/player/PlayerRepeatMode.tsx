import React, { useState } from "react";
import CustomButton from "../CustomButton";
import * as Haptics from "expo-haptics";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { musicStore } from "@/store/musicStore";

const PlayerRepeatMode = () => {
  const { storedRepeatMode, setStoredRepeatMode } = musicStore();
  const repeatModeOptions: Array<"repeat" | "repeat-off" | "repeat-once"> = [
    "repeat",
    "repeat-off",
    "repeat-once",
  ] as const;
  const repeatModeToast = [
    "Repeat All",
    "No Repeat",
    "Repeat Current Track",
  ] as const;
  const repeatVal =
    storedRepeatMode === RepeatMode.Queue
      ? 0
      : storedRepeatMode === RepeatMode.Off
      ? 1
      : 2;
  const [repeatMode, setRepeatMode] = useState(repeatVal);
  const handleOnRepeatChange = () => {
    const newRepeatVal = (repeatMode + 1) % repeatModeOptions.length;
    setRepeatMode(newRepeatVal);
    const val =
      newRepeatVal === 0
        ? RepeatMode.Queue
        : newRepeatVal === 1
        ? RepeatMode.Off
        : RepeatMode.Track;
    TrackPlayer.setRepeatMode(val);
    setStoredRepeatMode(val);
  };
  return (
    <CustomButton
      onPress={handleOnRepeatChange}
      style={{ alignItems: "center", marginTop: 20 }}
      hapticType={Haptics.NotificationFeedbackType.Error}
      toastText={repeatModeToast[(repeatMode + 1) % repeatModeOptions.length]}
    >
      <MaterialCommunityIcons
        name={repeatModeOptions[repeatMode]}
        size={26}
        color="#fff"
      />
    </CustomButton>
  );
};

export default React.memo(PlayerRepeatMode);
