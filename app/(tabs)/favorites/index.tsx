import { View, Text } from "react-native";
import React from "react";
import { defaultStyles } from "@/styles/default";
import { useMusicStore } from "@/store/useMusicStore";

const Favorites = () => {
  const { localMusic } = useMusicStore();
  return (
    <View style={defaultStyles.container}>
      <Text style={defaultStyles.text}>Favorites</Text>
    </View>
  );
};

export default Favorites;
