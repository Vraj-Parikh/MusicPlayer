import { TSortBy } from "@/components/TrackList";
import * as MediaLibrary from "expo-media-library";
import { AddTrack, Track } from "react-native-track-player";
export const convertToNativeTrackPlayerFormat = (
  data: Array<MediaLibrary.Asset>
): Array<AddTrack> => {
  return data.map((track, idx) => {
    const convertTrack: AddTrack = {
      id: track.id,
      creationTime: track.creationTime,
      modificationTime: track.modificationTime,
      url: track.uri,
      duration: track.duration,
      title: track.filename.split(".")[0],
      artist: "<unknown>",
    };
    return convertTrack;
  });
};
export const filterTracksByName = (
  searchVal: string,
  data: AddTrack[] | null
): AddTrack[] => {
  if (!data) return [];
  return data.filter((item) =>
    item.title?.toLowerCase()?.includes(searchVal.toLowerCase())
  );
};
export const sortTracks = (
  data: AddTrack[],
  sortBy: TSortBy["sortBy"],
  ascending: boolean
) => {
  let sortFuncLogic: ((a: Track, b: Track) => number) | null = null;
  switch (sortBy) {
    case "Title":
      sortFuncLogic = (a, b) => {
        const cmp1 = a.title || "";
        const cmp2 = b.title || "";
        return ascending ? cmp1.localeCompare(cmp2) : cmp2.localeCompare(cmp1);
      };
      break;
    case "Duration":
      sortFuncLogic = (a, b) => {
        const cmp1 = a.duration || 0;
        const cmp2 = b.duration || 0;
        return ascending ? cmp1 - cmp2 : cmp2 - cmp1;
      };
      break;
    case "Recent":
      sortFuncLogic = (a, b) => {
        const cmp1 = a.modificationTime || 0;
        const cmp2 = b.modificationTime || 0;
        return ascending ? cmp1 - cmp2 : cmp2 - cmp1;
      };
      break;
    default:
      return [...data];
  }
  return [...data].sort(sortFuncLogic);
};
