import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ArrowLeft, Clock, X } from "lucide-react-native";
import { router } from "expo-router";

export default function Success() {
  return (
    <View className="flex-1 bg-black px-5 pt-6">
      <View className="flex-row justify-between items-center mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center mr-4"
        >
          <ArrowLeft size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-accent rounded-full w-10 h-10 items-center justify-center" onPress={() => router.push("/(tabs)/Index")}>
          < X size={24} className="" color="#C2C2C280" />
        </TouchableOpacity>
      </View>

      {/* Top Icon */}
      <View className="items-center mb-6">
        <Image
          source={require("@/assets/images/images_ratio.png")}
          //   className="w-[160px] h-[160px]"
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text className="text-secondary text-4xl font-bold text-center mb-2">
        Campaign Success!
      </Text>
      <Text className="text-gray-300 text-center mb-8">
        Congratulations, you’ve started a campaign
      </Text>

      {/* Stat Cards */}
      <View className="flex-row justify-center gap-4 mb-12">
        {/* Total Points */}
        <View className="w-[160px] h-[100px] rounded-[16px] border border-secondary overflow-hidden">
          <View className="bg-secondary px-3 py-2 items-center">
            <Text className="text-black font-bold text-xl">TOTAL POINTS</Text>
          </View>
          <View className="flex-1 justify-center items-center flex-row gap-2">
            <Image
              source={require("@/assets/images/ArtisteRadarLogo.png")}
              className="w-5 h-5"
            />
            <Text className="text-secondary font-bold text-lg">40</Text>
          </View>
        </View>

        {/* Speed */}
        <View className="w-[160px] h-[100px] rounded-[16px] border border-white overflow-hidden">
          <View className="bg-white px-3 py-2 items-center">
            <Text className="text-black font-bold text-xl">SPEED</Text>
          </View>
          <View className="flex-1 justify-center items-center flex-row gap-2">
            <Clock size={18} color="white" />
            <Text className="text-white font-bold text-lg">2:42</Text>
          </View>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View className="flex-row justify-center gap-4 mt-6">
              <TouchableOpacity onPress={() => router.push("/Index")}  className="bg-white items-center justify-center py-4 w-[160px] rounded-lg">
          <Text className="text-black font-bold text-lg">Run Again</Text>
        </TouchableOpacity>

        <TouchableOpacity className="bg-secondary items-center justify-center py-4 w-[160px] rounded-lg">
          <Text className="text-black font-bold text-lg">Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
