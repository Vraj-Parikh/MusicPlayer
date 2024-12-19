import { useEffect, useRef } from "react";
import TrackPlayer, { RepeatMode } from "react-native-track-player";
import { PlayerOptions } from "react-native-track-player";
const setUpPlayer = async () => {
  await TrackPlayer.setupPlayer({
    maxCacheSize: 1024 * 10,
  });
  await TrackPlayer.setRepeatMode(RepeatMode.Queue);
};

const useSetupTrackPlayer = ({ onLoad = () => {} }) => {
  const isSetUp = useRef<boolean>(false);
  useEffect(() => {
    // console.log(isSetUp);
    if (isSetUp.current) {
      return;
    }
    (async () => {
      try {
        await setUpPlayer();
        isSetUp.current = true;
        onLoad();
      } catch (error) {
        isSetUp.current = false;
        console.error(error);
      }
    })();
  }, [onLoad]);
};

export default useSetupTrackPlayer;
