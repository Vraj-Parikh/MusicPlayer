import { View, Text } from "react-native";
import React from "react";
import { TSortBy } from "./TrackList";
import CustomButton from "./CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, fontSize } from "@/constants/constant";
type SortByBtnProps = {
  sortBy: TSortBy;
  setSortBy: React.Dispatch<React.SetStateAction<TSortBy>>;
};
const orderOptions: Array<TSortBy["sortBy"]> = ["Recent", "Title", "Duration"];
const SortByBtn = ({ sortBy, setSortBy }: SortByBtnProps) => {
  const changeOrder = () => {
    setSortBy((prev) => ({
      ...prev,
      ascending: !prev.ascending,
    }));
  };
  const changeSortBy = () => {
    const currIdx = orderOptions.indexOf(sortBy.sortBy);
    const nextIdx = (currIdx + 1) % orderOptions.length;
    setSortBy((prev) => ({ ...prev, sortBy: orderOptions[nextIdx] }));
  };
  return (
    <View style={{ flexDirection: "row", gap: 3 }}>
      <CustomButton onPress={changeSortBy}>
        <Text
          numberOfLines={1}
          style={{
            color: colors.primary,
            fontSize: fontSize.xxs,
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          {sortBy.sortBy}
        </Text>
      </CustomButton>
      <CustomButton onPress={changeOrder}>
        <Ionicons
          name={sortBy.ascending ? "arrow-down" : "arrow-up"}
          size={18}
          color={colors.primary}
        />
      </CustomButton>
    </View>
  );
};

export default SortByBtn;
