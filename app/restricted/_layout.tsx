import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyles } from "@/styles/default";

const RestictedLayout = () => {
  return (
    <SafeAreaView style={defaultStyles.container}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
};

export default RestictedLayout;
