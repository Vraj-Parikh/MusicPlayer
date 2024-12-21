import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/styles/default";
import TrackList from "@/components/TrackList";
import { colors, screenPadding } from "@/constants/constant";
import CustomTextInput from "@/components/CustomTextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
const Songs = () => {
  const [search, setSearch] = useState("");
  // const { localMusic } = musicStore();

  // if (!localMusic || localMusic.length === 0) {
  //   return <View style={defaultStyles.container}></View>;
  // }

  return (
    <View
      style={{
        ...defaultStyles.container,
        paddingLeft: screenPadding.horizontal,
        paddingRight: screenPadding.horizontal,
        position: "relative",
      }}
    >
      <CustomTextInput
        placeholder="Search Songs"
        leftIcon={<Ionicons name="search" size={24} color={colors.primary} />}
        value={search}
        setValue={setSearch}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <TrackList
          flatlistProps={{
            scrollEnabled: false,
          }}
          search={search}
        />
      </ScrollView>
    </View>
  );
};

export default Songs;
