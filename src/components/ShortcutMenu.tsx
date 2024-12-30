import React, { useRef } from "react";
import { MenuView, MenuComponentRef } from "@react-native-menu/menu";
import { useFavoritesTrackStore } from "@/store/useFavoritesTrackStore";
import { AddTrack } from "react-native-track-player";
import { match } from "ts-pattern";
import { useRouter } from "expo-router";
import { Platform } from "react-native";
type ShortcutMenuProps = {
  track: AddTrack;
  children: React.ReactElement;
};
const ShortcutMenu = ({ track, children }: ShortcutMenuProps) => {
  const router = useRouter();
  const { favoritesTracksIds, addFavorite, removeFavorite } =
    useFavoritesTrackStore();
  const isFavorite = favoritesTracksIds.includes(track.id);
  const menuRef = useRef<MenuComponentRef>(null);
  const handlePressAction = (id: string) => {
    match(id)
      .with("remove-from-favorites", () => {
        removeFavorite(track.id);
      })
      .with("add-to-favorites", () => {
        addFavorite(track.id);
      })
      .with("add-to-playlist", () => {
        router.push({
          pathname: "(modals)/addToPlaylist",
          params: { trackUrl: track.url },
        });
      })
      .otherwise(() => console.error(`menu id ${id} not found`));
  };
  return (
    <MenuView
      ref={menuRef}
      title="shortcutMenu"
      onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
      actions={[
        {
          id: isFavorite ? "remove-from-favorites" : "add-to-favorites",
          title: isFavorite ? "Remove From Favorites" : "Add To Favorites",
          image:
            Platform.OS === "ios"
              ? isFavorite
                ? "star.fill"
                : "star"
              : "ic_star",
        },
        {
          id: "add-to-playlist",
          title: "Add To Playlist",
          image: Platform.OS === "ios" ? "ic_menu_add" : "ic_playlist_add",
        },
      ]}
    >
      {children}
    </MenuView>
  );
};

export default ShortcutMenu;
