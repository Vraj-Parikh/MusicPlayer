import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { defaultStyles } from "@/styles/default";
import { SafeAreaView } from "react-native-safe-area-context";
import { useActiveTrack } from "react-native-track-player";
import FastImage from "react-native-fast-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FallBackArtworkUri } from "@/constants/images";
import { colors, fontSize } from "@/constants/constant";
import PlayerRepeatMode from "@/components/player/PlayerRepeatMode";
import VolumeBar from "@/components/player/VolumeBar";
import ControlCenter from "@/components/player/ControlCenter";
import ProgressBar from "@/components/player/ProgressBar";
import React, { useEffect, useState } from "react";
import usePlayerBackground from "@/hooks/usePlayerBackground";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { useFavoritesTrackStore } from "@/store/useFavoritesTrackStore";
const player = () => {
  const activeTrack = useActiveTrack();
  const { favoritesTracksIds, addFavorite, removeFavorite } =
    useFavoritesTrackStore();
  const imageColors = usePlayerBackground(
    activeTrack?.artwork || FallBackArtworkUri
  );
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    if (!activeTrack) return;
    if (favoritesTracksIds.includes(activeTrack.id)) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  }, [activeTrack, favoritesTracksIds]);
  const addToFavorite = () => {
    if (!activeTrack) return;
    addFavorite(activeTrack.id);
    setFavorite(true);
    ToastAndroid.show("Added To Favorites !", ToastAndroid.SHORT);
  };
  const removeFromFavorite = () => {
    if (!activeTrack) return;
    removeFavorite(activeTrack.id);
    setFavorite(false);
    ToastAndroid.show("Removed From Favorites !", ToastAndroid.SHORT);
  };
  if (!activeTrack) {
    return <></>;
  }
  return (
    <SafeAreaView style={[defaultStyles.container]}>
      <LinearGradient
        colors={
          imageColors
            ? [imageColors.lightMuted, imageColors.darkMuted]
            : [colors.background, colors.background]
        }
        style={{ ...style.container, flexGrow: 1 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            paddingLeft: 10,
          }}
        >
          <CustomButton onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={30} color="#000" />
          </CustomButton>
          <Text
            style={{
              fontWeight: "bold",
              flex: 1,
              textAlign: "center",
              fontSize: fontSize.sm,
              transform: [{ translateX: -10 }],
            }}
          >
            NOW PLAYING
          </Text>
        </View>
        <FastImage
          source={{
            uri: activeTrack.artwork || FallBackArtworkUri,
            priority: FastImage.priority.high,
          }}
          style={style.img}
        />
        <View style={style.titleContainer}>
          <Text numberOfLines={1} style={style.titleText}>
            {activeTrack.title}
          </Text>
          {favorite ? (
            <CustomButton onPress={removeFromFavorite}>
              <Ionicons name="heart" size={24} color="red" />
            </CustomButton>
          ) : (
            <CustomButton onPress={addToFavorite}>
              <Ionicons
                name="heart-outline"
                size={24}
                color={colors.textMuted}
              />
            </CustomButton>
          )}
        </View>
        <Text numberOfLines={1} style={style.artistText}>
          {activeTrack.artist || "<unknown>"}
        </Text>
        <ProgressBar />
        <ControlCenter />
        <VolumeBar />
        <PlayerRepeatMode />
      </LinearGradient>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  titleText: {
    color: colors.text,
    flex: 1,
    fontWeight: "bold",
    fontSize: fontSize.base,
  },
  artistText: {
    color: colors.text,
    fontSize: fontSize.xs,
    marginBottom: 40,
  },
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 30,
    paddingTop: 30,
  },
  img: {
    width: "100%",
    height: "45%",
    borderRadius: 20,
    // borderWidth: 1,
    // borderColor: colors.textMuted,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 40,
    marginTop: "auto",
  },
});

export default player;
