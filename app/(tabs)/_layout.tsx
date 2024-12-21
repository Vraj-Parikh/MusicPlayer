import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";
import { defaultStyles } from "@/styles/default";
import { colors, fontSize, sizes } from "@/constants/constant";
import { SafeAreaView } from "react-native-safe-area-context";
import FloatingPlayer from "@/components/FloatingPlayer";
import useLocalMusic from "@/hooks/useLocalMusic";
import { musicStore } from "@/store/musicStore";
import TrackPlayer from "react-native-track-player";
const _layout = () => {
  useLocalMusic();
  const { localMusic } = musicStore();
  useEffect(() => {
    if (!localMusic || localMusic.length === 0) return;
    try {
      TrackPlayer.add(localMusic);
    } catch (error: any) {
      console.log(error);
    }
    return () => {
      TrackPlayer.reset();
    };
  }, [localMusic]);
  return (
    <SafeAreaView style={defaultStyles.container}>
      <Tabs
        screenOptions={{
          tabBarStyle: style.tabContainer,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "#8f8e8f",
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: fontSize.xxs,
            fontWeight: "bold",
          },
          tabBarBackground: () => (
            <BlurView
              intensity={25}
              blurReductionFactor={1000}
              style={style.blurView}
            />
          ),
        }}
      >
        <Tabs.Screen
          name="favorites"
          options={{
            tabBarLabel: "Favorites",
            tabBarIcon: ({ color }) => (
              <FontAwesome
                name="heart"
                size={sizes.tabIconSizeSm}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="playlists"
          options={{
            tabBarLabel: "Playlists",
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="playlist-play"
                size={sizes.tabIconSizeMd}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="(songs)"
          options={{
            tabBarLabel: "Songs",
            headerTitle: "",
            tabBarIcon: ({ color }) => (
              <FontAwesome
                name="music"
                size={sizes.tabIconSizeSm}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="artists"
          options={{
            tabBarLabel: "Artists",
            tabBarIcon: ({ color }) => (
              <FontAwesome
                name="group"
                size={sizes.tabIconSizeSm}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
      <FloatingPlayer />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  blurView: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.background,
  },
  tabContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    borderTopWidth: 0,
    height: sizes.tabHeight,
    paddingTop: 8,
  },
});
export default _layout;
