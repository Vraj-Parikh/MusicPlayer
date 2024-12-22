import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles/default";
import { useMusicStore } from "@/store/useMusicStore";
import { colors, screenPadding } from "@/constants/constant";
import { StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { FallbackArtistUri } from "@/constants/images";
import { router } from "expo-router";
const Artists = () => {
  const { localMusic } = useMusicStore();
  if (!localMusic || localMusic.length === 0) {
    return <View style={defaultStyles.container}></View>;
  }
  const artists: string[] = [];
  localMusic.forEach(({ artist }) => {
    if (!artist) return;
    if (!artists.includes(artist)) {
      artists.push(artist);
    }
  });
  console.log(artists);
  return (
    <View style={style.mainContainer}>
      {artists.map((item) => (
        <TouchableOpacity
          key={item}
          style={style.container}
          onPress={() => router.push(`/artists/${item}`)}
        >
          <FastImage
            source={{
              uri: FallbackArtistUri,
              priority: FastImage.priority.normal,
            }}
            resizeMode="cover"
            style={style.img}
          />
          <Text style={style.text}>{item}</Text>
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

export default Artists;
