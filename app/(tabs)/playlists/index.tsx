import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { defaultStyles } from "@/styles/default";
import useNavigationSearch from "@/hooks/useNavigationSearch";

const Playlists = () => {
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.text}>Playlist</Text>
    </View>
  );
};

export default Playlists;
