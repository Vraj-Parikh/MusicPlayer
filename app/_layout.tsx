import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
const _layout = () => {
  return (
    <SafeAreaProvider>
      <StatusBar translucent />
      <RootNavigation />
    </SafeAreaProvider>
  );
};

const RootNavigation = React.memo(() => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="auth" />
      <Stack.Screen name="restricted" />
    </Stack>
  );
});
export default _layout;
