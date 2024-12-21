import { useCallback, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import { getMusic, filterTracks } from "@/utility/ExpoMediaUtils";
import { convertToNativeTrackPlayerFormat } from "@/utility/ReactNativeTrackUtils";
import { musicStore } from "@/store/musicStore";
function useLocalMusic() {
  const { setLocalMusic } = musicStore();
  const setMusicZustand = useCallback(async () => {
    const music = await getMusic();
    if (music) {
      const filterdTracks = filterTracks(music, ["mp3"]);
      const formattedTrack = convertToNativeTrackPlayerFormat(filterdTracks);
      setLocalMusic(formattedTrack);
    }
  }, []);
  useEffect(() => {
    (async () => {
      await setMusicZustand();
      const subscription = MediaLibrary.addListener(setMusicZustand);
      return () => {
        subscription.remove();
      };
    })();
  }, []);
}

export default useLocalMusic;
