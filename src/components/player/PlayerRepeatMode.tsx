import React, { ComponentProps, useState, useCallback } from "react";
import CustomButton from "../CustomButton";
import * as Haptics from "expo-haptics";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { RepeatMode } from "react-native-track-player";
import { useMusicStore } from "@/store/useMusicStore";
import { match } from "ts-pattern";
import { ToastAndroid } from "react-native";

type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];
const repeatOrder: Array<RepeatMode> = [
  RepeatMode.Off,
  RepeatMode.Queue,
  RepeatMode.Track,
] as const;
const PlayerRepeatMode = () => {
  const { storedRepeatMode, setStoredRepeatMode } = useMusicStore();
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(storedRepeatMode);
  const handleOnRepeatChange = useCallback(() => {
    const newIdx = (repeatOrder.indexOf(repeatMode) + 1) % repeatOrder.length;
    setRepeatMode(repeatOrder[newIdx]);
    setStoredRepeatMode(repeatOrder[newIdx]);
    const toastMsg = match(repeatOrder[newIdx])
      .with(RepeatMode.Off, () => "No Repeat")
      .with(RepeatMode.Queue, () => "Repeat All")
      .with(RepeatMode.Track, () => "Repeat Current Track")
      .otherwise(() => "");
    ToastAndroid.show(toastMsg, ToastAndroid.SHORT);
  }, [repeatMode]);
  const iconName: IconName = match(repeatMode)
    .with(RepeatMode.Off, (): IconName => "repeat-off")
    .with(RepeatMode.Queue, (): IconName => "repeat")
    .with(RepeatMode.Track, (): IconName => "repeat-once")
    .otherwise((): IconName => "repeat-off");
  return (
    <CustomButton
      onPress={handleOnRepeatChange}
      style={{ alignItems: "center", marginTop: 20 }}
      hapticType={Haptics.NotificationFeedbackType.Error}
    >
      <MaterialCommunityIcons name={iconName} size={26} color="#fff" />
    </CustomButton>
  );
};

export default React.memo(PlayerRepeatMode);
