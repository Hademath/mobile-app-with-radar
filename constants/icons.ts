import { ImageSourcePropType } from "react-native";
import activityicons from "@/assets/icons/activityicon.png";
import browseicon from "@/assets/icons/browseicon.png";
import storeicon from "@/assets/icons/storeicon.png";
import rankicon from "@/assets/icons/rankicon.png";
import homeicon from "@/assets/icons/homeicon.png";


export type IconType = {
    activityicons: ImageSourcePropType;
    browseicon: ImageSourcePropType;
    storeicon: ImageSourcePropType;
    rankicon: ImageSourcePropType;
    homeicon: ImageSourcePropType;
};

const icons: IconType = {
    activityicons,
    browseicon,
    storeicon,
    rankicon,
    homeicon,

};
export default icons;