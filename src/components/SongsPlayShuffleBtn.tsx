import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors, fontSize } from "@/constants/constant";
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import { useActiveQueueStore } from "@/store/useActiveQueue";
import { TSortBy } from "./TrackList";
type SongsPlayShuffleBtnProps = {
  trackLength: number;
  id: string;
  setSortBy: React.Dispatch<React.SetStateAction<TSortBy>>;
};
const SongsPlayShuffleBtn = ({
  trackLength,
  id,
  setSortBy,
}: SongsPlayShuffleBtnProps) => {
  const { playing } = useIsPlaying();
  const activeTrack = useActiveTrack();
  const { activeQueue, setActiveQueue } = useActiveQueueStore();
  const isactiveQueue = activeQueue === id;
  const onPressPlay = async () => {
    try {
      if (isactiveQueue) {
        if (activeTrack) {
          await TrackPlayer.play();
        }
      } else {
        setActiveQueue(id);
        setSortBy((prev) => ({ ...prev }));
        // await TrackPlayer.skip(0);
        await TrackPlayer.play();
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const onPressPause = async () => {
    try {
      await TrackPlayer.pause();
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  const onPressShuffle = async () => {
    try {
      if (!isactiveQueue) {
        await onPressPlay();
      } else {
        const randomIdx = Math.floor(Math.random() * trackLength);
        await TrackPlayer.skip(randomIdx);
        await TrackPlayer.play();
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  return (
    <View style={style.container}>
      <CustomButton
        style={style.btnContainer}
        onPress={playing ? onPressPause : onPressPlay}
      >
        <>
          <Ionicons
            name={playing && isactiveQueue ? "pause" : "play"}
            size={20}
            color={colors.primary}
          />
          <Text style={style.text}>
            {playing && isactiveQueue ? "Pause" : "Play"}
          </Text>
        </>
      </CustomButton>
      <CustomButton style={style.btnContainer} onPress={onPressShuffle}>
        <>
          <Ionicons name="shuffle-outline" size={20} color={colors.primary} />
          <Text style={style.text}>Shuffle</Text>
        </>
      </CustomButton>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    // marginTop: 20,
    borderWidth: 2,
    // height: "100%",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.bgGrey,
    gap: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 7,
    paddingBottom: 7,
    borderRadius: 10,
  },
  text: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: fontSize.xxs,
  },
});
export default SongsPlayShuffleBtn;
