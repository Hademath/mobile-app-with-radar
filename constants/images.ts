// import { ImageSourcePropType } from "react-native";


import Afrobeat from "@/assets/images/Afrobeat";
import HipHop from "@/assets/images/HipHop"
import RandB from "@/assets/images/RandB";
import ProviileSelect from "@/assets/images/ProviileSelect";


export type IconType = {

    Afrobeat: typeof Afrobeat;
    HipHop: typeof HipHop;
    RandB: typeof RandB;
    ProviileSelect: typeof ProviileSelect;


};

const images: IconType = {
    Afrobeat,
    HipHop,
    RandB,
    ProviileSelect
};
export default images;