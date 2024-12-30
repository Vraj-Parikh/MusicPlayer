import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { defaultStyles } from "@/styles/default";
import { usePlaylistTrackStore } from "@/store/usePlaylistTrackStore";
import CustomTextInput from "@/components/CustomTextInput";
import { colors, fontSize } from "@/constants/constant";
import Ionicons from "@expo/vector-icons/Ionicons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMusicStore } from "@/store/useMusicStore";
import CustomButton from "@/components/CustomButton";
// import AddPlaylistModal from "@/components/addPlaylistModal";
const addToPlaylist = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");
  const { trackUrl } = useLocalSearchParams<{
    trackUrl: string;
  }>();
  const { localMusic } = useMusicStore();
  const router = useRouter();
  const track = localMusic?.find((localTrack) => localTrack.url === trackUrl);
  const { playlists } = usePlaylistTrackStore();
  const filteredPlaylists = search
    ? playlists.filter((item) =>
        item.name?.toLowerCase()?.includes(search.toLowerCase())
      )
    : playlists;
  if (!track) {
    return <></>;
  }
  const handleOnDone = () => {
    router.back();
  };
  return (
    <SafeAreaView style={style.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: StyleSheet.hairlineWidth,
          paddingBottom: 10,
          borderColor: "#fff",
          marginBottom: 15,
          marginTop: 5,
        }}
      >
        <Text style={style.subText}>Add Track</Text>
        <Text style={style.trackTitle} numberOfLines={1}>
          {track.title}
        </Text>
        <Text style={style.subText}>To Playlists</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomButton onPress={() => setModalVisible(true)} style={style.btn}>
          <>
            <Ionicons name="add-circle-outline" size={20} color={colors.text} />
            <Text style={{ color: colors.text }}>New Playlist</Text>
          </>
        </CustomButton>
        <CustomButton onPress={handleOnDone} style={style.btn}>
          <Text style={{ color: colors.text }}>Done</Text>
        </CustomButton>
      </View>
      {/* <AddPlaylistModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      /> */}
      <CustomTextInput
        placeholder="Search Playlists"
        leftIcon={<Ionicons name="search" size={24} color={colors.primary} />}
        value={search}
        setValue={setSearch}
      />

      <FlatList
        data={filteredPlaylists}
        extraData={filteredPlaylists}
        renderItem={({ item }) => (
          <DisplayAddPlaylist
            name={item.name}
            playlistTracks={item.tracks}
            trackUrl={trackUrl}
          />
        )}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ gap: 10, maxHeight: 300 }}
      />
    </SafeAreaView>
  );
};
type DisplayAddPlaylistProps = {
  name: string;
  playlistTracks: string[];
  trackUrl: string;
};
const DisplayAddPlaylist = ({
  name,
  playlistTracks,
  trackUrl,
}: DisplayAddPlaylistProps) => {
  const { addTrackToPlaylist, removeTrackFromPlaylist } =
    usePlaylistTrackStore();
  const [isChecked, setIsChecked] = useState(playlistTracks.includes(trackUrl));
  const toggleAddToPlaylist = () => {
    if (isChecked) {
      removeTrackFromPlaylist(name, trackUrl);
    } else {
      addTrackToPlaylist(name, trackUrl);
    }
    setIsChecked(!isChecked);
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <BouncyCheckbox
        useBuiltInState={false}
        isChecked={isChecked}
        onPress={toggleAddToPlaylist}
        fillColor="green"
      />
      <Text
        numberOfLines={1}
        style={{ flex: 1, color: colors.text, fontSize: fontSize.xs }}
      >
        {name}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    ...defaultStyles.container,
    paddingLeft: 20,
    paddingRight: 20,
    gap: 15,
  },
  subText: {
    color: colors.text,
    fontSize: fontSize.xs,
    fontWeight: "semibold",
  },
  trackTitle: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: "bold",
    color: colors.primary,
    fontSize: fontSize.sm,
  },
  btn: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: colors.textMuted,
    padding: 8,
    borderRadius: 10,
  },
});
export default addToPlaylist;
