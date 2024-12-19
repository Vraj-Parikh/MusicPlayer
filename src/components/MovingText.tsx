// import { useEffect } from "react";
// import Animated, {
//   cancelAnimation,
//   Easing,
//   StyleProps,
//   useAnimatedStyle,
//   useSharedValue,
//   withDelay,
//   withRepeat,
//   withTiming,
// } from "react-native-reanimated";

// type MovingTextProps = {
//   text: string;
//   animationThresold: number;
//   style?: StyleProps;
// };
// const MovingText = ({ text, animationThresold, style }: MovingTextProps) => {
//   const translateX = useSharedValue(0);
//   const shouldAnimate = text.length >= animationThresold;
//   const textWidth = text.length * 3;
//   const animatedStyle = useAnimatedStyle(() => ({
//     transform: [{ translateX: translateX.value }],
//   }));
//   useEffect(() => {
//     if (!shouldAnimate) return;
//     translateX.value = withDelay(
//       1000,
//       withRepeat(
//         withTiming(-textWidth, {
//           duration: 5000,
//           easing: Easing.linear,
//         }),
//         -1,
//         false
//       )
//     );
//     return () => {
//       cancelAnimation(translateX);
//       translateX.value = 0;
//     };
//   }, [translateX.value]);
//   return (
//     <Animated.Text
//       numberOfLines={1}
//       style={[
//         style,
//         animatedStyle,
//         shouldAnimate && { width: 9999, paddingLeft: 16 },
//       ]}
//     >
//       {text}
//     </Animated.Text>
//   );
// };

// export default MovingText;
