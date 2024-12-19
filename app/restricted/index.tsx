import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { defaultStyles } from "@/styles/default";
import { colors } from "@/constants/constant";

const index = () => {
  return (
    <SafeAreaView style={[defaultStyles.container, style.container]}>
      <StatusBar translucent />
      <View>
        <Text style={defaultStyles.text}>Enable Local Storage to Use App</Text>
        <TouchableOpacity style={style.button} activeOpacity={0.5}>
          <Text style={[style.buttonText]}>Press To Give Permission</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: colors.text,
    alignSelf: "center",
    paddingInline: 10,
    paddingBlock: 5,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: colors.text,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default index;
