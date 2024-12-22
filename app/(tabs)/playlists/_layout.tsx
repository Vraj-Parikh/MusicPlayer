import { View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { defaultStyles } from "@/styles/default";

const PlaylistScreenLayout = () => {
  return (
    <View style={defaultStyles.container}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="[playlist]" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

export default PlaylistScreenLayout;
