import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import React from "react";
import * as Haptics from "expo-haptics";

type CustomButtonProps = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactElement;
  hapticType?: Haptics.NotificationFeedbackType;
  onPress?: () => void;
};
const CustomButton = ({
  style,
  onPress,
  children,
  hapticType,
}: CustomButtonProps) => {
  const handleOnPress = async () => {
    if (hapticType) {
      await Haptics.notificationAsync(hapticType);
    }
    onPress?.();
  };
  return (
    <TouchableOpacity onPress={handleOnPress} style={style} activeOpacity={0.4}>
      {children}
    </TouchableOpacity>
  );
};

export default CustomButton;
