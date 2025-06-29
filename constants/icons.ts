import { ImageSourcePropType } from "react-native";
import activityicons from "@/assets/icons/activityicon.png";
import browseicon from "@/assets/icons/browseicon.png";
import storeicon from "@/assets/icons/storeicon.png";
import rankicon from "@/assets/icons/rankicon.png";
import homeicon from "@/assets/icons/homeicon.png";
import YoutubeIcon from "@/assets/images/svgs/YoutubuRedIcon";
import AppleMusic from "@/assets/images/svgs/AppleMusics";
import SpotifyIcon from "@/assets/images/svgs/SpotifyIcon"
import ArtisteSecondaryLogo from "@/assets/images/svgs/ArtisteSecondaryLogo";


export type IconType = {
    activityicons: ImageSourcePropType;
    browseicon: ImageSourcePropType;
    storeicon: ImageSourcePropType;
    rankicon: ImageSourcePropType;
    homeicon: ImageSourcePropType;
    YoutubeIcon: typeof YoutubeIcon;
    AppleMusic: typeof AppleMusic;
    SpotifyIcon: typeof SpotifyIcon
    ArtisteSecondaryLogo: typeof ArtisteSecondaryLogo;
};

const icons: IconType = {
    activityicons,
    browseicon,
    storeicon,
    rankicon,
    homeicon,
    YoutubeIcon,
    AppleMusic,
    SpotifyIcon,
    ArtisteSecondaryLogo

};
export default icons;