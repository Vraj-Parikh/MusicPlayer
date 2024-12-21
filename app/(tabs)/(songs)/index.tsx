import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/styles/default";
import TrackList, { TSortBy } from "@/components/TrackList";
import { colors, screenPadding } from "@/constants/constant";
import CustomTextInput from "@/components/CustomTextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useMusicStore } from "@/store/useMusicStore";
const Songs = () => {
  const [search, setSearch] = useState("");
  const { localMusic } = useMusicStore();

  if (!localMusic || localMusic.length === 0) {
    return <View style={defaultStyles.container}></View>;
  }
  const initialSortBy: TSortBy = {
    sortBy: "Recent",
    ascending: false,
  };
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
          id="3"
          flatlistProps={{
            scrollEnabled: false,
          }}
          search={search}
          data={localMusic}
          initialSortBy={initialSortBy}
        />
      </ScrollView>
    </View>
  );
};

export default Songs;
