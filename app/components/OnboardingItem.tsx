import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import WalkthroughIcon from "../../assets/images/svgs/WalkthroughIcon";
import WavesWhiteSvg from "../../assets/images/svgs/ArtisteRadarLogo";
import Line from "../../assets/images/svgs/Line";

interface Props {
  item: {
    title: string;
    description: string;
    image: any;
  };
}

const { width } = Dimensions.get("window");

const OnboardingItem: React.FC<Props> = ({ item }) => {
  return (
    <View
      className="flex-1 items-left justify-center bg-black p-[20px]"
      style={{ width }}
    >
      <View className="flex-row  ">
        <Line />
      <View className="flex-row items-center justify-end pr-4">
        <WavesWhiteSvg />
        <Text className="text-white  pl-4 text-left text-2xl font-bold leading-[60px] font-clash flex-row items-right">
          Welcome to Radar
        </Text>
      </View>
      </View>
      <View>
        <Text className=" text-white text-3xl text-left font-bold leading-[60px] mb-2 font-clash">
          {item.title}
        </Text>
        <Text className="font-clash text-tertiary w-[200px]  text-2xl text-left">
          {item.description}
        </Text>
      </View>
      {/* <Image source={item.image} resizeMode="contain" /> */}
      <WalkthroughIcon />
    </View>
  );
};


export default OnboardingItem;