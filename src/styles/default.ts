import { colors, fontSize } from "@/constants/constant";
import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  text: {
    fontSize: fontSize.base,
    color: colors.text,
  },
});

export const utilityStyle = StyleSheet.create({
  flexRow: {
    flexDirection: "row",
  },
  flexGrow: {
    flexGrow: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
