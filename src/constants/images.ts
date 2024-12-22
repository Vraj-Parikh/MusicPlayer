import FallBackArtwork from "@/assets/FallBackArtwork.png";
import FallbackArtist from "@/assets/FallbackArtist.jpg";
import FallbackPlaylist from "@/assets/FallbackPlaylist.jpg";
import { Image } from "react-native";
export const FallBackArtworkUri = Image.resolveAssetSource(FallBackArtwork).uri;
export const FallbackArtistUri = Image.resolveAssetSource(FallbackArtist).uri;
export const FallbackPlaylistUri =
  Image.resolveAssetSource(FallbackPlaylist).uri;
