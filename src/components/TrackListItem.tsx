import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { utilityStyle } from "@/styles/default";
import { colors, fontSize } from "@/constants/constant";
import { secondsToMmSs } from "@/utility/helper";
import Entypo from "@expo/vector-icons/Entypo";
import FastImage from "react-native-fast-image";
import { FallBackArtworkUri } from "@/constants/images";
import { Track } from "react-native-track-player";
import LoaderKit from "react-native-loader-kit";
import ShortcutMenu from "./ShortcutMenu";
const style = StyleSheet.create({
  artistText: {
    color: colors.textMuted,
    fontSize: fontSize.xxs,
  },
  artworkImage: {
    width: 50,
    height: "100%",
    borderRadius: 5,
  },
  container: {
    height: 60,
    flexDirection: "row",
    marginBottom: 10,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    borderRadius: 10,
  },
  titleText: {
    color: colors.text,
    fontWeight: "bold",
    width: "100%",
    fontSize: fontSize.xs,
  },
  durationText: {
    color: colors.textMuted,
    fontSize: fontSize.xxxs,
  },
});
type TrackListItemProps = {
  track: Track;
  isActive: boolean;
  isPlaying: boolean | undefined;
};
const TrackListItem = ({ track, isActive, isPlaying }: TrackListItemProps) => {
  return (
    <View
      style={[
        isActive && { backgroundColor: colors.primary, borderRadius: 15 },
        style.container,
      ]}
    >
      <View style={{ position: "relative" }}>
        <FastImage
          style={style.artworkImage}
          source={{
            uri: track?.artwork || FallBackArtworkUri,
            priority: FastImage.priority.normal,
          }}
        />
        {isActive && isPlaying && (
          <LoaderKit
            style={{
              ...StyleSheet.absoluteFillObject,
              transform: [{ scaleY: 0.5 }, { scaleX: 0.8 }],
            }}
            name={"LineScalePulseOut"}
            color={colors.primary}
          />
        )}
      </View>
      <View
        style={[
          utilityStyle.flexGrow,
          {
            flex: 1,
            justifyContent: "center",
          },
        ]}
      >
        <Text numberOfLines={1} style={style.titleText}>
          {track?.title}
        </Text>
        <Text numberOfLines={1} style={style.artistText}>
          {track?.artist || "<unknown>"}
        </Text>
      </View>
      <View style={utilityStyle.center}>
        <ShortcutMenu track={track}>
          <>
            <Entypo name="dots-three-horizontal" size={18} color="#fff" />
            <Text style={style.durationText}>
              {track?.duration && secondsToMmSs(track?.duration)}
            </Text>
          </>
        </ShortcutMenu>
      </View>
    </View>
  );
};

export default React.memo(TrackListItem);
