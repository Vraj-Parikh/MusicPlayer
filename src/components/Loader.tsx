import { View, ActivityIndicator } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles/default";
import { colors } from "@/constants/constant";

const Loader = () => {
  return (
    <View
      style={{
        ...defaultStyles.container,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default Loader;
