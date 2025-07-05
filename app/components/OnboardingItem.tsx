import React from "react";
import { View, Text, Image, Dimensions, SafeAreaView } from "react-native";
import WalkthroughIcon from "../../assets/images/svgs/WalkthroughIcon";
import ArtisteSecondaryLogo from "../../assets/images/svgs/ArtisteSecondaryLogo";
import ProgressHeader from "./ProgressHeader";

interface Props {
  item: {
    title: string;
    description: string;
    image: any;
    progress: number;
  };
}

const { width } = Dimensions.get("window");

const OnboardingItem: React.FC<Props> = ({ item }) => {
  return (
    <SafeAreaView className="flex-1  bg-black px-6" style={{ width }}>
      <View className="flex">
        <ProgressHeader step={item.progress} total={3} type="launchBar" />
        <View className="flex-row items-center justify-end ">
          <ArtisteSecondaryLogo width={30} height={30} />
          <Text className="text-white text-xl  leading-[60px] ">
            {"  "}Welcome to Radar
          </Text>
        </View>
      </View>
      <View>
        <Text className=" text-white text-3xl font-bold py-5 mb-2 font-clash uppercase">
          {item.title}
        </Text>
        <Text className="font-clash text-tertiary w-[200px]  text-2xl">
          {item.description}
        </Text>
      </View>
      {/* <Image source={item.image} resizeMode="contain" /> */}
      <WalkthroughIcon />
    </SafeAreaView>
  );
};


export default OnboardingItem;