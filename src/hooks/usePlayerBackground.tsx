import React from "react";
import { getColors } from "react-native-image-colors";
import { AndroidImageColors } from "react-native-image-colors/build/types";
import { useEffect, useState } from "react";
import { colors } from "@/constants/constant";
export default function usePlayerBackground(imageUrl: string) {
  const [imageColors, setImageColors] = useState<AndroidImageColors | null>(
    null
  );
  useEffect(() => {
    getColors(imageUrl, {
      fallback: colors.background,
      cache: true,
      key: imageUrl,
    }).then((colors) => setImageColors(colors as AndroidImageColors));
  }, [imageUrl]);
  return imageColors;
}
