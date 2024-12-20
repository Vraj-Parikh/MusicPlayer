import * as MediaLibrary from "expo-media-library";
import { AddTrack, Track } from "react-native-track-player";
export const convertToNativeTrackPlayerFormat = (
  data: Array<MediaLibrary.Asset>
): Array<AddTrack> => {
  return data.map((track) => {
    const convertTrack: AddTrack = {
      url: track.uri,
      duration: track.duration,
      title: track.filename.split(".")[0],
      // artwork: undefined,
      artist: "",
    };
    return convertTrack;
  });
};
export const filterTracksByTitle = (
  searchVal: string,
  data: AddTrack[] | null
): AddTrack[] => {
  if (!data) return [];
  return data.filter((item) =>
    item.title?.toLowerCase()?.includes(searchVal.toLowerCase())
  );
};
export const findTrackIdByUrl = (trackData: Track[], url: string) => {
  let returnIdx: number | null = null;
  for (let idx in trackData) {
    if (url === trackData[idx].url) {
      returnIdx = Number(idx);
      break;
    }
  }
  return returnIdx;
};
export const setUpPlayer = () => {};
