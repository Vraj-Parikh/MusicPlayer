import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "./CustomTextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, screenPadding } from "@/constants/constant";
import { defaultStyles } from "@/styles/default";
import TrackList, { TSortBy } from "./TrackList";
import { AddTrack } from "react-native-track-player";

type TrackListContainerProps = {
  id: string;
  data: AddTrack[];
  initialSortBy: TSortBy;
};
const TrackListContainer = ({
  id,
  data,
  initialSortBy,
}: TrackListContainerProps) => {
  const [search, setSearch] = useState("");
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
          id={id}
          flatlistProps={{
            scrollEnabled: false,
          }}
          search={search}
          data={data}
          initialSortBy={initialSortBy}
        />
      </ScrollView>
    </View>
  );
};

export default TrackListContainer;
