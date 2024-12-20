import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/constants/constant";
const SongsPlayShuffleBtn = () => {
  const onPressPlay = () => {};
  const onPressShuffle = () => {};
  return (
    <View style={style.container}>
      <CustomButton style={style.btnContainer} onPress={onPressPlay}>
        <>
          <Ionicons name="play" size={24} color={colors.primary} />
          <Text style={style.text}>Play</Text>
        </>
      </CustomButton>
      <CustomButton style={style.btnContainer} onPress={onPressShuffle}>
        <>
          <Ionicons name="shuffle-sharp" size={24} color={colors.primary} />
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
    gap: 20,
    marginTop: 20,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgGrey,
    gap: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 10,
  },
  text: {
    color: colors.primary,
    fontWeight: "bold",
  },
});
export default SongsPlayShuffleBtn;
