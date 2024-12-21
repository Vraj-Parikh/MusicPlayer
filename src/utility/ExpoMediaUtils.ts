import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";

export const permissionAlert = () => {
  Alert.alert("permission required", "this app needs to read audio files", [
    {
      text: "Allow",
      onPress: () => getPermission(),
    },
    {
      text: "cancel",
      onPress: () => permissionAlert(),
    },
  ]);
};

export const getAudioFiles = async () => {
  const mediaCountFunc = await MediaLibrary.getAssetsAsync({
    mediaType: MediaLibrary.MediaType.audio,
  });
  const totalCountvar = mediaCountFunc.totalCount;
  const media = await MediaLibrary.getAssetsAsync({
    mediaType: MediaLibrary.MediaType.audio,
    first: totalCountvar,
  });
  if (media.assets.length) {
    return media.assets.filter((asset) => asset.duration >= 1);
  }
  return null;
};
export const getPermission = async (): Promise<boolean> => {
  try {
    const permissionResponse = await MediaLibrary.getPermissionsAsync();
    if (permissionResponse.granted) {
      return true;
    }

    const response = await MediaLibrary.requestPermissionsAsync();
    if (response.granted) return true;
    else if (response?.canAskAgain) {
      return (await MediaLibrary.getPermissionsAsync()).status === "granted";
    }
    return false;
  } catch (error: any) {
    console.log(error.message);
    return false;
  }
};
export const getMusic = async () => {
  const gotPermission = await getPermission();
  if (!gotPermission) return;
  return await getAudioFiles();
};
export const filterTracks = (
  data: MediaLibrary.Asset[],
  formatsAllowed: string[]
) => {
  if (data.length === 0) {
    return [];
  }
  return data.filter((track) => {
    const tmp = track.filename.split(".");
    const extension = tmp[tmp.length - 1].toLowerCase();
    return formatsAllowed.includes(extension);
  });
};
