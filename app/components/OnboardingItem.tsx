import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

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
      <View>
        <Text className=" text-white text-3xl text-left font-bold leading-[60px] mb-2 font-clash">
          {item.title}
        </Text>
        <Text className="font-clash text-tertiary w-[200px]  text-2xl text-left">
          {item.description}
        </Text>
      </View>
      <Image source={item.image} resizeMode="contain" />
    </View>
  );
};


export default OnboardingItem;

