import { View, ScrollView, Text, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import CustomTextInput from "./CustomTextInput";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, fontSize, screenPadding } from "@/constants/constant";
import { defaultStyles } from "@/styles/default";
import TrackList, { TSortBy } from "./TrackList";
import { AddTrack } from "react-native-track-player";
import CustomButton from "./CustomButton";
import { useRouter } from "expo-router";

type TrackListContainerProps = {
  id: string;
  data: AddTrack[];
  initialSortBy: TSortBy;
  title?: string;
  showbackButton?: boolean;
};
const TrackListContainer = ({
  id,
  data,
  initialSortBy,
  title,
  showbackButton = false,
}: TrackListContainerProps) => {
  const [search, setSearch] = useState("");
  const flatlistProps = useMemo(() => ({ scrollEnabled: false }), []);
  const router = useRouter();
  return (
    <View
      style={{
        ...defaultStyles.container,
        paddingLeft: screenPadding.horizontal,
        paddingRight: screenPadding.horizontal,
        position: "relative",
      }}
    >
      {/* //TODO add remove text button */}
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        {showbackButton && (
          <CustomButton onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={25} color="#fff" />
          </CustomButton>
        )}
        <View style={{ flex: 1 }}>
          {title && (
            <Text style={style.title} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>
      </View>
      <CustomTextInput
        placeholder="Search Songs"
        leftIcon={<Ionicons name="search" size={24} color={colors.primary} />}
        value={search}
        setValue={setSearch}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <TrackList
          id={id}
          flatlistProps={flatlistProps}
          search={search}
          data={data}
          initialSortBy={initialSortBy}
        />
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    color: colors.primary,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: fontSize.sm,
  },
});
export default React.memo(TrackListContainer);
