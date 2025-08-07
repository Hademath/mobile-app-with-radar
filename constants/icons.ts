// import { ImageSourcePropType } from "react-native";
import activityIcon from "@/assets/icons/activityIcon";
import browseicon from "@/assets/icons/browseIcon";
import storeicon from "@/assets/icons/storeIcon";
import rankicon from "@/assets/icons/rankIcon";
import homeicon from "@/assets/icons/homeIcon";
import YoutubeIcon from "@/assets/images/svgs/YoutubuRedIcon";
import AppleMusic from "@/assets/images/svgs/AppleMusics";
import SpotifyIcon from "@/assets/images/svgs/SpotifyIcon"
import ArtisteSecondaryLogo from "@/assets/images/svgs/ArtisteSecondaryLogo";
import ArtisteLogo3 from "@/assets/images/svgs/ArtisteLogo3";
import fireIcon from "@/assets/icons/fireIcon";



export type IconType = {
  activityIcon: typeof activityIcon;
  browseicon: typeof browseicon;
  storeicon: typeof storeicon;
  rankicon: typeof rankicon;
  homeicon: typeof homeicon;
  fireIcon: typeof fireIcon; // Assuming fireIcon is the same as activityIcon
  YoutubeIcon: typeof YoutubeIcon;
  AppleMusic: typeof AppleMusic;
  SpotifyIcon: typeof SpotifyIcon;
  ArtisteSecondaryLogo: typeof ArtisteSecondaryLogo;
  ArtisteLogo3: typeof ArtisteLogo3;
};

const icons: IconType = {
    activityIcon,
    browseicon,
    storeicon,
    rankicon,
    homeicon,
    YoutubeIcon,
    AppleMusic,
    SpotifyIcon,
    ArtisteSecondaryLogo,
    ArtisteLogo3,
    fireIcon

};
export default icons;