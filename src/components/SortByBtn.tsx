import { View, Text, StyleSheet } from "react-native";
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
    <View style={{ flexDirection: "row", gap: 10 }}>
      <CustomButton onPress={changeSortBy} style={style.btnContainer}>
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
      <CustomButton onPress={changeOrder} style={style.btnContainer}>
        <Ionicons
          name={sortBy.ascending ? "arrow-up" : "arrow-down"}
          size={18}
          color={colors.primary}
        />
      </CustomButton>
    </View>
  );
};
const style = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgGrey,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 10,
  },
});
export default SortByBtn;
