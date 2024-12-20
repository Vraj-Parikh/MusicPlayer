import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { StyleSheet } from "react-native";
import { colors } from "@/constants/constant";
type TextInputProps = {
  placeholder?: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  isPassword?: boolean;
  inputProps?: React.ComponentProps<typeof TextInput>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};
const CustomTextInput = ({
  leftIcon,
  placeholder,
  rightIcon,
  isPassword = false,
  inputProps,
  value,
  setValue,
}: TextInputProps) => {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <View style={style.container}>
      {leftIcon}
      <View style={{ flexDirection: "row", flexGrow: 1, alignItems: "center" }}>
        <TextInput
          value={value}
          placeholder={placeholder}
          autoCapitalize="none"
          {...inputProps}
          secureTextEntry={isPassword && hidePassword}
          placeholderTextColor="#fff"
          style={style.input}
          onChangeText={(text) => setValue(text)}
        />
        {value.length > 0 && (
          <Entypo
            name="circle-with-cross"
            size={20}
            color="#666"
            onPress={() => setValue("")}
          />
        )}
        {isPassword &&
          (hidePassword ? (
            <Entypo
              name="eye-with-line"
              size={24}
              color="#fff"
              onPress={() => setHidePassword(false)}
            />
          ) : (
            <Entypo
              name="eye"
              size={24}
              color="#fff"
              onPress={() => setHidePassword(true)}
            />
          ))}
      </View>
      {rightIcon}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgGrey,
    borderRadius: 8,
    overflow: "hidden",
    // paddingBlock: 2,
    paddingLeft: 10,
    paddingRight: 10,
    gap: 5,
  },
  input: {
    color: "#fff",
    height: 40,
    paddingRight: 10,
    fontWeight: "semibold",
    // borderWidth: 2,
    borderColor: "#fff",
    flexGrow: 1,
    // flex: 1,
  },
});
export default CustomTextInput;
