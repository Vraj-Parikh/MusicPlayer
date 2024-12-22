import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles/default";
import { router } from "expo-router";
import { colors, fontSize, screenPadding } from "@/constants/constant";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { FallbackPlaylistUri } from "@/constants/images";
import { usePlaylistTrackStore } from "@/store/usePlaylistTrackStore";
const Playlists = () => {
  const { playlists } = usePlaylistTrackStore();
  if (playlists.length === 0) {
    return (
      <View
        style={{
          ...style.mainContainer,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ ...style.text, fontSize: fontSize.base }}>
          No Playlist Found
        </Text>
      </View>
    );
  }
  return (
    <View style={style.mainContainer}>
      {playlists.map(({ name }) => (
        <TouchableOpacity
          key={name}
          style={style.container}
          onPress={() => router.push(`/playlists/${name}`)}
        >
          <FastImage
            source={{
              uri: FallbackPlaylistUri,
              priority: FastImage.priority.normal,
            }}
            resizeMode="cover"
            style={style.img}
          />
          <Text style={style.text}>{name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const style = StyleSheet.create({
  img: {
    width: "100%",
    height: 200,
  },
  container: {
    width: "45%",
    borderWidth: 0.4,
    borderColor: colors.primary,
    borderRadius: 10,
    overflow: "hidden",
    gap: 10,
    paddingBottom: 5,
  },
  mainContainer: {
    ...defaultStyles.container,
    paddingLeft: screenPadding.horizontal,
    paddingRight: screenPadding.horizontal,
    paddingTop: 20,
  },
  text: {
    color: colors.text,
    textAlign: "center",
    fontWeight: "semibold",
  },
});
export default Playlists;
