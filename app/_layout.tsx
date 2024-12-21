import useSetupTrackPlayer from "@/hooks/useSetupTrackPlayer";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TrackPlayer from "react-native-track-player";
SplashScreen.preventAutoHideAsync();
const _layout = () => {
  TrackPlayer.registerPlaybackService(() => require("../PlaybackService"));
  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync();
  }, []);
  useSetupTrackPlayer({
    onLoad: handleTrackPlayerLoaded,
  });
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
      <Stack.Screen name="player" />
    </Stack>
  );
});
export default _layout;
