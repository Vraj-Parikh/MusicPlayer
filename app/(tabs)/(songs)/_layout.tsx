import { View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { defaultStyles } from "@/styles/default";
import { StackScreenWithSearchBar } from "@/constants/layout";
import { colors } from "@/constants/constant";

const SongsScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

export default SongsScreenLayout;
