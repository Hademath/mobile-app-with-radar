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
import ArtisteLogo3 from "@/assets/images/svgs/ArtisteLogo3";


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
    ArtisteLogo3: typeof ArtisteLogo3;
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
    ArtisteSecondaryLogo,
    ArtisteLogo3

};
export default icons;