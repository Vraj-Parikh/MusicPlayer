import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import { VolumeManager } from "react-native-volume-manager";
import { colors } from "@/constants/constant";
import { StyleSheet } from "react-native";
const VolumeBar = () => {
  const [volume, setVolume] = useState(0);
  useEffect(() => {
    (async () => {
      const { volume } = await VolumeManager.getVolume();
      setVolume(volume);
    })();
    const volumeListener = VolumeManager.addVolumeListener((result) => {
      setVolume(result.volume);
    });
    return () => volumeListener.remove();
  }, []);
  return (
    <View style={style.volumeContainer}>
      <Ionicons name="volume-low" size={22} color="#fff" />
      <Slider
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.primary}
        style={style.slider}
        value={volume}
        thumbTintColor={colors.primary}
        onValueChange={async (val) => {
          setVolume(val);
          await VolumeManager.setVolume(val);
        }}
      />
      <Ionicons name="volume-high" size={22} color="#fff" />
    </View>
  );
};

const style = StyleSheet.create({
  volumeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  slider: {
    flex: 1,
    height: 20,
  },
});
export default React.memo(VolumeBar);
