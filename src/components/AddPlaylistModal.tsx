import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import { colors } from "@/constants/constant";

type AddPlaylistModalProps = {
  isModalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddPlaylistModal = ({
  isModalVisible,
  setModalVisible,
}: AddPlaylistModalProps) => {
  return (
    <View style={{ flex: 1 }}>
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.5}
        style={{ margin: 0 }}
      >
        {/* <View style={{ flex: 1 }}> */}
        <Text style={{ color: "#fff" }}>Hello</Text>
        {/* <TextInput placeholder="Type Playlist Name" /> */}
        {/* </View> */}
      </Modal>
    </View>
  );
};

export default AddPlaylistModal;
