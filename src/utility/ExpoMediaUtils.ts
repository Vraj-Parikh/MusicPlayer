import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";
import { AddTrack } from "react-native-track-player";

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
    mediaType: "audio",
  });
  const totalCountvar = mediaCountFunc.totalCount;
  const media = await MediaLibrary.getAssetsAsync({
    mediaType: "audio",
    first: totalCountvar, // Retrieve all audio files
    //TODO Sort not working
    // sortBy: MediaLibrary.SortBy.duration,
  });
  //TODO filter only mp3
  if (media.assets.length) {
    return media.assets;
  }
  return null;
};

export const getPermission = async () => {
  return await MediaLibrary.getPermissionsAsync();
};

export const getMusic = async () => {
  const { granted, canAskAgain } = await getPermission();
  // if (granted) {
  return await getAudioFiles();
  // }
  if (!granted && canAskAgain) {
    const { granted: grantedRepeat, canAskAgain: canAskAgainRepeat } =
      await getPermission();
    if (grantedRepeat) {
      return await getAudioFiles();
    } else if (grantedRepeat && canAskAgainRepeat) {
      // permissionAlert()
    }
  }
  return null;
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
